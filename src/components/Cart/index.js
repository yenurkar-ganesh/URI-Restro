import './index.css'
import CartContext from '../../context/CartContext'
import CartItems from '../CartItems'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalOrderPrice = cartList.reduce(
        (total, eachItem) => total + eachItem.dish_price * eachItem.quantity,
        0,
      )
      const discount = (totalOrderPrice * 0.1).toFixed(2)
      const priceAfterDiscount = (totalOrderPrice - discount).toFixed(2)

      return (
        <div className="cart-container">
          {cartList.length > 1 ? <h1>My Orders : </h1> : <h1>My Order : </h1>}
          <ul className="cart-item-section">
            {cartList.map(eachOrder => (
              <CartItems key={eachOrder.id} eachOrder={eachOrder} />
            ))}
          </ul>
          <hr />
          <div className="total-price-section">
            <h2>Total Price</h2>
            <div className="total-section">
              <p className="order-meta">
                <span>
                  {' '}
                  Order Price (
                  {cartList.reduce(
                    (total, eachquantitu) => total + eachquantitu.quantity,
                    0,
                  )}
                  ) -
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
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
