import './index.css'
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
    quantity,
  } = dish

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, incrementToCartHandler} = value

        const incrementBtn = () => {
          incrementToCartHandler(dish)
          console.log(dish)
        }

        return (
          <li className='dish-list'>
            <div className='dish-info'>
              <h3 className='dish-name'>{dish_name}</h3>
              <div className='dish-price'>
                <span className='price-currency'>{dish_currency}</span>
                <span className='dish-price'>{dish_price}</span>
              </div>
              <p className='dish-desc'>{dish_description}</p>
              {dish_Availability && (
                <div className='btns-section'>
                  <button
                    onClick={incrementBtn}
                    className='incrementBtn'
                    type='button'
                  >
                    +
                  </button>
                  <p className='counter'> {!quantity ? 0 : {quantity}} </p>
                  <button className='decrementBtn' type='button'>
                    -
                  </button>
                </div>
              )}
              {addonCat.length > 0 && (
                <p className='customization'>Customization available</p>
              )}
              {!dish_Availability && <p className='not-avail'>Not available</p>}
            </div>
            <p className='dish-calories'>{dish_calories} calories</p>
            <img className='dish-img' src={dish_image} alt={dish_name} />
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Dishes
