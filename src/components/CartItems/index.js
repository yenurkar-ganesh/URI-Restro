import './index.css'

const CartItems = ({eachOrder}) => {
  const {dish_id, dish_currency, dish_image, dish_name, dish_price, quantity} =
    eachOrder

  const eachOrderTotalPrice = quantity * dish_price
  return (
    <li className="order-card" id={dish_id}>
      <img className="dish-card-img" src={dish_image} alt={dish_name} />
      <div className="dish-card-info">
        <h3>{dish_name} </h3>
        <p>Quantity : {quantity} </p>
        <p className="card-price-section">
          Price :<span>{dish_currency} </span>
          <span>{eachOrderTotalPrice} </span>
        </p>
      </div>
    </li>
  )
}
export default CartItems
