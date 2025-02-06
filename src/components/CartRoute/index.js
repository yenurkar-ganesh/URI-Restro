import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import CartItems from '../CartItems'
import Navbar from '../Navbar'
import './index.css'

const CartRoute = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  return (
    <div className="cart-container">
      <Navbar />
      <div className="cart-header-section">
        <h1>My Cart</h1>

        {cartList.length > 0 && (
          <button onClick={removeAllCartItems} type="button">
            Remove All
          </button>
        )}
      </div>

      {cartList.length === 0 ? (
        <div className="empty-cart-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="empty cart"
          />
          <h2>GOOD FOOD IS ALWAYS COOKING</h2>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <ul className="cart-item-section">
          {cartList.map(eachOrder => (
            <CartItems key={eachOrder.dish_id} eachOrder={eachOrder} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default CartRoute
