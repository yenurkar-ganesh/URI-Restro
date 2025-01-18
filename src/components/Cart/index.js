import './index.css'
import CartContext from '../../context/CartContext'
import CartItems from '../CartItems'
import Navbar from '../Navbar'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const totalOrderPrice = cartList.reduce(
        (total, eachItem) => total + eachItem.dish_price * eachItem.quantity,
        0,
      )
      const discount = (totalOrderPrice * 0.1).toFixed(2)
      const priceAfterDiscount = (totalOrderPrice - discount).toFixed(2)

      const removeAllHandler = () => {
        removeAllCartItems() // Ensures the function in CartContext is triggered
      }

      return (
        <div className="cart-container">
          <Navbar cartCount={cartList.length} />
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
            <>
              <div className="cart-header-section">
                <h1>My {cartList.length > 1 ? 'Orders' : 'Order'}:</h1>
                <button
                  type="button"
                  className="remove-btn"
                  data-testid="removeAllButton"
                  onClick={removeAllHandler}
                >
                  Remove All
                </button>
              </div>
              <ul className="cart-item-section">
                {cartList.map(eachOrder => (
                  <CartItems key={eachOrder.dish_id} eachOrder={eachOrder} />
                ))}
              </ul>
              <hr />
              <div className="total-price-section">
                <h2>Total Price</h2>
                <div className="total-section">
                  <p className="order-meta">
                    <span>
                      Order Price (
                      {cartList.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}
                      ) -{' '}
                    </span>
                    {totalOrderPrice}
                  </p>
                  <p className="order-meta">
                    <span>Discount (10%) - </span>
                    {discount}
                  </p>
                  <hr className="line" />
                  <h4 className="order-meta">
                    <span>Total Price - </span>
                    {priceAfterDiscount}
                  </h4>
                </div>
              </div>
            </>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
