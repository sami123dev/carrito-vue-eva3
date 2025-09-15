<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-light bg-white shadow-sm p-3">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <h1 class="h4 fw-bold m-0">Carrito Vue</h1>
        <button @click="showCart = !showCart" class="btn btn-outline-dark position-relative">
          🛒
          <span
            v-if="store.totalItems"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ store.totalItems }}
          </span>
        </button>
      </div>
    </nav>

    <!-- Carrito -->
    <CartOffcanvas v-if="showCart" @close="showCart = false" @toast="notify" />

    <!-- Router -->
    <router-view @added="notify" />

    <!-- Toast de boostrap-->
    <Toast ref="toastRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import store from './store'
import CartOffcanvas from './components/Cart.vue'
import Toast from './components/Toast.vue'

const showCart = ref(false)
const toastRef = ref(null)

function notify({ text, type }) {
  toastRef.value.showToast(text, type)
}
</script>
