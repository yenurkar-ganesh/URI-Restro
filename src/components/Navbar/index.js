import './index.css'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoIosCart} from 'react-icons/io'
import {useContext, useState} from 'react'
import CartContext from '../../context/CartContext'

const Navbar = ({restroName}) => {
  const {cartList, setCartList} = useContext(CartContext) // Add setCartList
  const history = useHistory()

  // Initialize dish counts to 0 for all dishes
  const [dishCounts, setDishCounts] = useState(Array.from({length: 5-1}, () => 0))

  // Calculate total cart items correctly
  const totalCartItems = cartList.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0,
  )

  // Handle decrement logic
  const handleDecrement = index => {
    setDishCounts(prevCounts => {
      const newCounts = [...prevCounts]
      if (newCounts[index] > 0) {
        newCounts[index] -= 1

        // Update the cartList to reflect the decrement
        const updatedCartList = cartList.map((item, i) =>
          i === index
            ? {...item, quantity: Math.max(item.quantity - 1, 0)}
            : item,
        )
        setCartList(updatedCartList)
      }
      return newCounts
    })
  }

  const logoutHandler = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link to="/" className="nav-link">
            <h1 className="nav-heading">
              {restroName ? 'UNI Resto Cafe' : ''}
            </h1>
          </Link>
        </li>
        <li className="nav-list-item">
          <p>My Orders</p>
          <Link className="cart-link" to="/cart">
            <button data-testid="cart" className="cart-btn">
              <IoIosCart size={25} />
            </button>
          </Link>
          <div>
            {/* Render initial dish counts */}
            {dishCounts.map((count, index) => (
              <p key={index}>{count}</p>
            ))}
          </div>
          {/* Display total cart items */}
          <p data-testid="cartCount">{totalCartItems }</p>
          <button
            onClick={logoutHandler}
            type="button"
            className="logoutBtn"
            data-testid="logoutBtn"
          >
            LOGOUT
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
