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

      const {
        dish_id,
        dish_currency,
        dish_image,
        dish_name,
        dish_price,
        quantity,
      } = eachOrder

      const updatedDish = {
        id: dish_id,
        dishCurrency: dish_currency,
        dishImage: dish_image,
        dishName: dish_name,
        dishPrice: dish_price,
        quantity,
      }

      const eachOrderTotalPrice = updatedDish.quantity * updatedDish.dishPrice

      return (
        <li className='cart-item'>
          <img
            className='cart-product-image'
            src={updatedDish.dishName}
            alt={updatedDish.dishName}
          />
          <div className='cart-item-details-container'>
            <div className='cart-product-title-brand-container'>
              <p className='cart-product-title'>dishName</p>
              <p className='cart-product-brand'>
                by {updatedDish.dishCurrency} {updatedDish.dishPrice}
              </p>
            </div>
            <div className='cart-quantity-container'>
              <button
                type='button'
                className='quantity-controller-button'
                onClick={() => decrementCartItemQuantity(eachOrder.dish_id)}
                aria-label='Decrement quantity'
                data-testid='minus'
              >
                -
              </button>

              <p className='cart-quantity' data-testid={`quantity-${dish_id}`}>
                {updatedDish.quantity}
              </p>
              <button
                type='button'
                className='quantity-controller-button'
                onClick={() => incrementCartItemQuantity(eachOrder)}
                aria-label='Increment quantity'
                data-testid='plus'
              >
                +
              </button>
            </div>
            <div className='total-price-remove-container'>
              <p className='cart-total-price'>
                {updatedDish.dishCurrency} {eachOrderTotalPrice}/-
              </p>
              <button
                type='button'
                className='remove-button'
                onClick={() => removeCartItem(updatedDish.id)}
                aria-label='Remove item'
                data-testid='remove'
              >
                <IoRemove color='#D9534F' size={16} />
              </button>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItems
