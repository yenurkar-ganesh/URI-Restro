import './index.css'
import CartContext from '../../context/CartContext'
import {IoRemove} from 'react-icons/io5'

const CartItems = ({eachOrder}) => (
  <CartContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value

      const incrementBtn = () => {
        incrementCartItemQuantity(eachOrder) // Calls the increment function in CartContext
      }

      const decrementHandler = () => {
        decrementCartItemQuantity(eachOrder) // Calls the decrement function in CartContext
        if (eachOrder.quantity <= 1) {
          removeCartItem(eachOrder.dish_id) // Removes the item when quantity reaches 0
        }
      }

      const removeHandler = () => {
        removeCartItem(eachOrder.dish_id) // Removes the item when "Remove" is clicked
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
              <button
                onClick={removeHandler}
                className="removeBtn"
                type="button"
                data-testid="removeBtn"
              >
                <IoRemove />
              </button>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItems
