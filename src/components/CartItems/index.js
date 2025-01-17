import './index.css'
import CartContext from '../../context/CartContext'

const CartItems = ({eachOrder}) => (
  <CartContext.Consumer>
    {value => {
      const {incrementToCartHandler, decrementToCartHandler} = value

      const incrementBtn = () => {
        incrementToCartHandler(eachOrder)
      }

      const decrementHandler = () => {
        decrementToCartHandler(eachOrder)
      }

      const {
        dish_id,
        dish_currency,
        dish_image,
        dish_name,
        dish_price,
        quantity,
      } = eachOrder

      const eachOrderTotalPrice = quantity * dish_price

      return (
        <li
          className="order-card"
          id={dish_id}
          data-testid={`cartItem-${dish_id}`}
        >
          <img
            className="dish-card-img"
            src={dish_image}
            alt={dish_name}
            data-testid="dishImage"
          />
          <div className="dish-card-info">
            <h3 data-testid="dishName">{dish_name}</h3>
            <p>Quantity: {quantity}</p>
            <p className="card-price-section">
              Price: <span>{dish_currency}</span>
              <span>{eachOrderTotalPrice}</span>
            </p>
            <hr />
            <div className="cart-btns-section">
              <button
                onClick={incrementBtn}
                className="incrementBtn"
                type="button"
                data-testid="incrementBtn"
              >
                +
              </button>
              <p className="counter" data-testid="dishQuantity">
                {quantity}
              </p>
              <button
                onClick={decrementHandler}
                className="decrementBtn"
                type="button"
                data-testid="decrementBtn"
              >
                -
              </button>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItems
