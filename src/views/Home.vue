<template>
  <div class="container py-4">
    <div class="row g-4">
      <div v-for="p in store.products" :key="p.id" class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100 text-center">
          <img :src="p.image" :alt="p.name" class="card-img-top img-fluid" style="height:200px; object-fit:contain;" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ p.name }}</h5>
            <p class="card-text">{{ store.formatCLP(p.price) }}</p>
            <p :class="['small mb-3', p.stock <= 1 ? 'text-danger fw-bold' : 'text-muted']">
              Stock: {{ p.stock }}
            </p>
            <button
              @click="add(p)"
              :disabled="store.cartQty(p.id) >= p.stock"
              class="btn btn-primary mt-auto"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import store from '../store'
const emit = defineEmits(['added'])

function add(product) {
  if (store.cartQty(product.id) < product.stock) {
    store.addToCart(product.id)
    emit('added', { text: `${product.name} agregado al carrito`, type: 'success' })
  } else {
    emit('added', { text: `No hay más stock disponible de ${product.name}`, type: 'warning' })
  }
}
</script>
