import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoIosCart} from 'react-icons/io'
import CartContext from '../../context/CartContext'

const Navbar = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const {restroName} = props

      const logoutHandler = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const cartCount = cartList.reduce(
        (total, each) => total + each.quantity,
        0,
      )

      return (
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-list-item">
              <Link to="/" className="nav-link">
                <h1 className="nav-heading">{restroName}</h1>
              </Link>
            </li>
            <li className="nav-list-item">
              <p>My Orders</p>
              <Link className="cart-link" to="/cart">
                <button data-testid="cart" className="cart-btn">
                  <IoIosCart size={25} />
                </button>
              </Link>
              <p data-testid="cartCount">{cartCount}</p>
              <button
                onClick={logoutHandler}
                type="button"
                className="logoutBtn"
                role="button"
                data-testid="logoutBtn"
              >
                LOGOUT
              </button>
            </li>
          </ul>
        </nav>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Navbar)
