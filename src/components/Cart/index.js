import './index.css'
import CartContext from '../../context/CartContext'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return <div className="cart-container">Length :: {cartList.length}</div>
    }}
  </CartContext.Consumer>
)

export default Cart
