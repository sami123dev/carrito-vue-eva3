<template>
  <div class="container py-4">
    <h2 class="fw-bold mb-4">Resumen de compra</h2>
    <div v-if="store.cartList.length">
      <div v-for="item in store.cartList" :key="item.id" class="d-flex justify-content-between align-items-center border-bottom py-2">
        <div class="d-flex align-items-center gap-2">
          <img :src="item.image" :alt="item.name" class="rounded" style="width:40px; height:40px; object-fit:cover;" />
          <span>{{ item.name }} (x{{ item.qty }})</span>
        </div>
        <span>{{ store.formatCLP(item.price * item.qty) }}</span>
      </div>
      <div class="d-flex justify-content-between fw-bold mt-3">
        <span>Total</span>
        <span>{{ store.formatCLP(store.cartTotal) }}</span>
      </div>
      <button @click="confirmarCompra" class="btn btn-success w-100 mt-3">Confirmar compra</button>
    </div>
    <p v-else class="text-muted">No hay productos en el carrito.</p>
  </div>
</template>

<script setup>
import store from '../store'
const emit = defineEmits(['added'])
function confirmarCompra() {
  emit('added', { text: '¡Compra confirmada con éxito!', type: 'success' })
  store.clearCart()
}
</script>
