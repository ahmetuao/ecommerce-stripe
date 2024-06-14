import { applyMiddleware, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

const initialState = {
  listItems: localStorage.getItem('products')
    ? JSON.parse(localStorage.getItem('products'))
    : [],

  cart: {
    cartProducts: {
      cart: localStorage.getItem('products-cart')
        ? JSON.parse(localStorage.getItem('products-cart'))
        : [],
      totalPrice: 0,
    },
    cartServices: {
      cart: localStorage.getItem('services-cart')
        ? JSON.parse(localStorage.getItem('services-cart'))
        : [],
      totalPrice: 0,
    },
  },
}

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk),
)

store.subscribe(() => {
  const { cartProducts, cartServices } = store.getState().cart
  const { listItems } = store.getState()
  localStorage.setItem('products-cart', JSON.stringify(cartProducts.cart))
  localStorage.setItem('services-cart', JSON.stringify(cartServices.cart))
  localStorage.setItem('products', JSON.stringify(listItems))
})
