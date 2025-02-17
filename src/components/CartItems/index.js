import './index.css'
import CartContext from '../../context/CartContext'
import {IoRemove} from 'react-icons/io5'
import {useContext} from 'react'

const CartItems = ({order}) => {
  const {incrementCartItemQuantity, decrementCartItemQuantity, removeCartItem} =
    useContext(CartContext)

  const {dish_id, dish_currency, dish_image, dish_name, dish_price, quantity} =
    order

  return (
    <li className="order-card" data-testid={`cartItem-${dish_id}`}>
      <img
        className="dish-card-img"
        src={dish_image}
        alt={dish_name}
        data-testid="dishImage"
      />
      <div className="dish-card-info">
        <h3 data-testid="dishName">{dish_name}</h3>
        <p>
          Quantity: <span data-testid="dishQuantity">{quantity}</span>
        </p>
        <p className="card-price-section">
          Price: <span>{dish_currency} </span>
          <span data-testid="dishPrice">{dish_price * quantity}</span>
        </p>
        <hr />
        <div className="cart-btns-section">
          <button
            onClick={() => incrementCartItemQuantity(dish_id)}
            className="incrementBtn"
            type="button"
            data-testid="incrementBtn"
          >
            +
          </button>
          <p className="counter">{quantity}</p>
          <button
            onClick={() => {
              if (quantity > 1) {
                decrementCartItemQuantity(dish_id)
              } else {
                removeCartItem(dish_id)
              }
            }}
            className="decrementBtn"
            type="button"
            data-testid="decrementBtn"
          >
            -
          </button>

          <button
            onClick={() => removeCartItem(dish_id)}
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
}

export default CartItems
