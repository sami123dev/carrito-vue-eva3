<template>
  <div class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-end" style="z-index:1050;">
    <div class="bg-white shadow-lg p-3 d-flex flex-column" style="width: 320px; height: 100%;">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="m-0">Tu Carrito</h5>
        <button class="btn-close" @click="$emit('close')"></button>
      </div>

      <!-- Lista de productos -->
      <div class="flex-grow-1 overflow-auto">
        <div v-if="store.cartList.length">
          <div v-for="item in store.cartList" :key="item.id" class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex align-items-center gap-2">
              <img :src="item.image" :alt="item.name" class="rounded" style="width:50px; height:50px; object-fit:cover;" />
              <div>
                <p class="mb-0 fw-semibold">{{ item.name }}</p>
                <small class="text-muted">{{ store.formatCLP(item.price) }} × {{ item.qty }}</small>
              </div>
            </div>
            <div class="btn-group">
              <button @click="decrease(item)" class="btn btn-outline-secondary btn-sm">-</button>
              <button @click="increase(item)" class="btn btn-outline-secondary btn-sm">+</button>
              <button @click="remove(item)" class="btn btn-outline-danger btn-sm">🗑</button>
            </div>
          </div>
        </div>
        <p v-else class="text-muted text-center">Carrito vacío</p>
      </div>

      <!-- Footer -->
      <div class="border-top pt-2">
        <p class="fw-bold">Total: {{ store.formatCLP(store.cartTotal) }}</p>
        <router-link to="/checkout" class="btn btn-success w-100 mt-2">Comprar</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import store from '../store'
const emit = defineEmits(['close', 'toast'])

function increase(item) {
  if (store.cartQty(item.id) < item.stock) {
    store.incQty(item.id)
    emit('toast', { text: `Cantidad de ${item.name} aumentada`, type: 'success' })
  } else {
    emit('toast', { text: `No hay más stock disponible de ${item.name}`, type: 'warning' })
  }
}
function decrease(item) {
  if (store.cartQty(item.id) > 1) {
    store.decQty(item.id)
    emit('toast', { text: `Cantidad de ${item.name} reducida`, type: 'warning' })
  } else {
    store.removeFromCart(item.id)
    emit('toast', { text: `${item.name} eliminado del carrito`, type: 'error' })
  }
}
function remove(item) {
  store.removeFromCart(item.id)
  emit('toast', { text: `${item.name} eliminado del carrito`, type: 'error' })
}
</script>
