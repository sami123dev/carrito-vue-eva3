<template>
  <div
    class="toast-container position-fixed bottom-0 end-0 p-3"
    style="z-index: 1055"
  >
    <div
      v-if="visible"
      class="toast align-items-center text-white border-0 show"
      :class="toastClass"
      role="alert"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ message }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          @click="visible = false"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const visible = ref(false)
const message = ref('')
const type = ref('success')

const toastClass = computed(() => {
  switch (type.value) {
    case 'success': return 'bg-success'
    case 'warning': return 'bg-warning text-dark'
    case 'error': return 'bg-danger'
    default: return 'bg-secondary'
  }
})

function showToast(text, t = 'success') {
  message.value = text
  type.value = t
  visible.value = true
  setTimeout(() => { visible.value = false }, 2000)
}

defineExpose({ showToast })
</script>
