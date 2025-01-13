import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  incrementToCartHandler: () => {},
  decrementToCartHandler: () => {},
})

export default CartContext
