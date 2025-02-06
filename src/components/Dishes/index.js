import {useState, useContext} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

const Dishes = ({dish, activeCategory}) => {
  const [quantity, setQuantity] = useState(0)
  const {
    cartList,
    addCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  const {
    dish_name,
    dish_currency,
    dish_price,
    dish_description,
    dish_Availability,
    addonCat,
    dish_calories,
    dish_image,
    dish_id,
  } = dish

  const dishInCart = cartList.find(eachDish => eachDish.dish_id === dish_id)

  const incrementBtn = () => {
    if (dishInCart) {
      incrementCartItemQuantity(dish_id)
    } else {
      setQuantity(prevQuantity => prevQuantity + 1)
    }
  }

  const decrementHandler = () => {
    if (dishInCart && dishInCart.quantity > 0) {
      decrementCartItemQuantity(dish_id)
    } else if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1)
    }
  }

  const onAddToCartHandler = () => {
    if (quantity > 0) {
      addCartItem({...dish, quantity})
    }
  }

  return (
    <li className="dish-list">
      <div className="dish-info">
        <p className="dish-name" data-testid="dishName">
          {dish_name}
        </p>
        <p className="dish-price">{`${dish_currency} ${dish_price}`}</p>
        <p className="dish-desc">{dish_description}</p>
        {dish_Availability && (
          <div className="btns-section">
            <button
              onClick={incrementBtn}
              className="incrementBtn"
              data-testid="incrementBtn"
            >
              +
            </button>
            <p className="counter">
              {dishInCart ? dishInCart.quantity : quantity}
            </p>
            <button
              onClick={decrementHandler}
              className="decrementBtn"
              data-testid="decrementBtn"
            >
              -
            </button>
            <button
              onClick={onAddToCartHandler}
              className="add-to-cart-btn"
              data-testid="addToCart"
            >
              ADD TO CART
            </button>
          </div>
        )}
        {addonCat.length > 0 && (
          <p className="customization">Customizations available</p>
        )}
        {!dish_Availability && <p className="not-avail">Not available</p>}
      </div>
      <p className="dish-calories">{dish_calories} calories</p>
      <img
        className="dish-img"
        src={dish_image}
        alt={dish_name}
        data-testid="dishImage"
      />
    </li>
  )
}

export default Dishes
