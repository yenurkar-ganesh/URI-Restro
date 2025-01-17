import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  incrementToCartHandler: () => {},
  decrementToCartHandler: () => {},
  removeAllCartItems: () => {},
})

export default CartContext
