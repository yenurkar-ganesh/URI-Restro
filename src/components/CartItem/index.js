import './index.css'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value

      const {cartItemDetails} = props
      const {
        dish_id,
        dish_currency,
        dish_image,
        dish_name,
        dish_price,
        quantity,
      } = cartItemDetails

      const onIncrement = () => incrementCartItemQuantity(dish_id)
      const onDecrement = () => decrementCartItemQuantity(dish_id)
      const onRemove = () => removeCartItem(dish_id)

      return (
        <li className="cart-item">
          <img
            className="cart-product-image"
            src={dish_image}
            alt={dish_name}
            data-testid="dishImage"
          />

          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title" data-testid="dishName">
                {dish_name}
              </p>
              <section className="dish-price-section">
                <p className="cart-product-brand"> {dish_currency}</p>
                <p className="cart-product-brand"> {dish_price}</p>
              </section>
            </div>
            <div className="cart-quantity-container">
              <button
                onClick={onDecrement}
                type="button"
                className="quantity-controller-button"
                data-testid="decrementBtn"
                role="button"
                role="button"
              >
                -{' '}
              </button>
              <p className="cart-quantity" data-testid={`quantity-${dish_id}`}>
                {quantity}
              </p>
              <button
                type="button"
                onClick={onIncrement}
                className="quantity-controller-button"
                data-testid="incrementBtn"
                role="button"
                role="button"
              >
                +{' '}
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">
                {dish_currency} {dish_price * quantity}/-
              </p>
              <button
                type="button"
                className="remove-button"
                onClick={onRemove}
                aria-label="Remove item"
                data-testid="remove"
                role="button"
                role="button"
              >
                <AiFillCloseCircle color="#D9534F" size={16} />
              </button>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
