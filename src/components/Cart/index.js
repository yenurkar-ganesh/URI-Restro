import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import Navbar from '../Navbar'
import './index.css'

const Cart = () => {
  const {
    cartList,
    removeAllCartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  return (
    <div className="cart-route">
      <Navbar />
      <div className="cart-container">
        <h1 className="cart-heading">Cart</h1>

        {cartList.length > 0 ? (
          <>
            <div className="cart-header">
              <button
                type="button"
                className="remove-all-btn"
                onClick={removeAllCartItems}
              >
                Remove All
              </button>
            </div>

            <ul className="cart-list">
              {cartList.map(item => (
                <li key={item.dish_id} className="cart-item">
                  <img
                    src={item.dish_image}
                    alt={item.dish_name}
                    className="cart-item-image"
                  />
                  <p className="cart-item-name">{item.dish_name}</p>
                  <p className="cart-item-price">
                    ${(item.dish_price * item.quantity).toFixed(2)}
                  </p>

                  <div className="cart-item-controls">
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => decrementCartItemQuantity(item.dish_id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <p className="quantity" data-testid="cart-quantity">
                      {item.quantity}
                    </p>
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => incrementCartItemQuantity(item.dish_id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeCartItem(item.dish_id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="empty-cart">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              alt="empty cart"
              className="empty-cart-image"
            />
            <p className="empty-cart-message">Your Cart is Empty</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
