import './index.css'
import {useContext, useEffect, useState} from 'react'
import CartContext from '../../context/CartContext'

const Dishes = ({dish}) => {
  const {
    dish_name,
    dish_currency,
    dish_price,
    dish_description,
    dish_Availability,
    addonCat,
    dish_calories,
    dish_image,
  } = dish

  const {cartList, incrementCartItemQuantity, decrementCartItemQuantity} =
    useContext(CartContext)
  const [quantity, setQuantity] = useState(0)

  // Sync local quantity state with cartList
  useEffect(() => {
    const cartItem = cartList.find(item => item.dish_name === dish_name)
    setQuantity(cartItem ? cartItem.quantity : 0)
  }, [cartList, dish_name])

  const incrementBtn = () => {
    incrementCartItemQuantity(dish)
    console.log(dish)
  }

  const decrementHandler = () => {
    decrementCartItemQuantity(dish)
  }

  return (
    <li className="dish-list">
      <div className="dish-info">
        <h3 className="dish-name">{dish_name}</h3>
        <div className="dish-price">
          <p className="price-currency">{dish_currency}</p>
          <p className="dish-price">{dish_price}</p>
        </div>
        <p className="dish-desc">{dish_description}</p>
        {dish_Availability && (
          <div className="btns-section">
            <button
              onClick={incrementBtn}
              className="incrementBtn"
              type="button"
            >
              +
            </button>
            <p className="counter">{quantity}</p>
            <button
              onClick={decrementHandler}
              className="decrementBtn"
              type="button"
            >
              -
            </button>
          </div>
        )}
        <button type="button">ADD TO CART</button>
        {addonCat.length > 0 && (
          <p className="customization">Customization available</p>
        )}
        {!dish_Availability && <p className="not-avail">Not available</p>}
      </div>
      <p className="dish-calories">{dish_calories} calories</p>
      <img className="dish-img" src={dish_image} alt={dish_name} />
    </li>
  )
}

export default Dishes
