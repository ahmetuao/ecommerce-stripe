import {
  ADD_TO_CART,




  CLEAR_CART, DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
  UPDATE_CART
} from './actionTypes'

export const setAddToCart = (item, cartType) => {
  return {
    type: ADD_TO_CART,
    payload: { ...item, cartType },
  }
}

export const setUpdateCart = (item, cartType) => {
  return {
    type: UPDATE_CART,
    payload: { ...item, cartType },
  }
}

export const setIncrementQuantity = (itemId, cartType) => {
  return {
    type: INCREMENT_QUANTITY,
    payload: { itemId, cartType },
  }
}

export const setDecrementQuantity = (itemId, cartType) => {
  return {
    type: DECREMENT_QUANTITY,
    payload: { itemId, cartType },
  }
}

export const setRemoveFromCart = (itemId, cartType) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { itemId, cartType },
  }
}

export const setClearCart = ( cartType) => {
  return {
    type: CLEAR_CART,
    payload: { cartType },
  }
}
