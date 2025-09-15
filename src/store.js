import { reactive } from 'vue'

// Lista de productos
const state = reactive({
  products: [
    { id: 'AUD', name: 'Audífono', price: 30000, stock: 3, image: new URL('./assets/audifono.jpg', import.meta.url).href },
    { id: 'MOU', name: 'Mouse',    price: 20000, stock: 5, image: new URL('./assets/mouse.jpg', import.meta.url).href },
    { id: 'TEK', name: 'Teclado',  price: 15000, stock: 10, image: new URL('./assets/teclado.jpg', import.meta.url).href },
    { id: 'GAB', name: 'Gabinete', price: 35000, stock: 4, image: new URL('./assets/gabinete.jpg', import.meta.url).href },
    { id: 'PAN', name: 'Pantalla', price: 175000, stock: 3, image: new URL('./assets/pantalla.jpg', import.meta.url).href },
    { id: 'SIL', name: 'Silla',    price: 150000, stock: 2, image: new URL('./assets/silla.jpg', import.meta.url).href },
  ],
  cart: loadCart()
})

// Carga/guardado de carrito 
function loadCart() {
  try {
    const raw = localStorage.getItem('cart')
    if (!raw) return {}
    const data = JSON.parse(raw)
    const out = {}
    for (const [id, qty] of Object.entries(data)) {
      const n = Number(qty)
      if (Number.isFinite(n) && n > 0) out[id] = n
    }
    return out
  } catch {
    localStorage.removeItem('cart')
    return {}
  }
}
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(state.cart))
}

// Utilidades
function productById(id) {
  return state.products.find(p => p.id === id)
}
function cartQty(id) {
  return Number(state.cart[id] || 0)
}

// Mutaciones
function addToCart(id) {
  const p = productById(id)
  if (!p) return
  const current = cartQty(id)
  if (current + 1 > p.stock) return
  state.cart[id] = current + 1
  saveCart()
}
function incQty(id) {
  const p = productById(id)
  if (!p) return
  const current = cartQty(id)
  if (current + 1 > p.stock) return
  state.cart[id] = current + 1
  saveCart()
}
function decQty(id) {
  const current = cartQty(id)
  if (current <= 1) delete state.cart[id]
  else state.cart[id] = current - 1
  saveCart()
}
function removeFromCart(id) {
  if (id in state.cart) {
    delete state.cart[id]
    saveCart()
  }
}
function clearCart() {
  for (const k in state.cart) delete state.cart[k]
  saveCart()
}

// Getters
const store = {
  get products() { return state.products },
  get cart() { return state.cart },
  get cartList() {
    return Object.entries(state.cart)
      .map(([id, qty]) => {
        const p = productById(id)
        return p ? { ...p, qty: Number(qty) } : null
      })
      .filter(Boolean)
  },
  get totalItems() {
    return Object.values(state.cart).reduce((a, b) => a + Number(b || 0), 0)
  },
  get cartTotal() {
    return this.cartList.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0),
      0
    )
  },

  productById, cartQty, addToCart, incQty, decQty, removeFromCart, clearCart,

  formatCLP(n) {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(Number(n) || 0)
  }
}

export default store
