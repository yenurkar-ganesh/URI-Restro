import './index.css'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoIosCart} from 'react-icons/io'
import {useContext} from 'react'
import CartContext from '../../context/CartContext'

const Navbar = ({restroName}) => {
  const {cartList} = useContext(CartContext)
  const history = useHistory()

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
          <p data-testid="cartCount">{cartList.length}</p>
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
