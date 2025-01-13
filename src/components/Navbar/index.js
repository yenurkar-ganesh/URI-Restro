import './index.css'
import {Link} from 'react-router-dom'
import {IoIosCart} from 'react-icons/io'
import CartContext from '../../context/CartContext'

const Navbar = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <nav className="navbar">
          <ul className="nav-list ">
            <li className="nav-list-item">
              <h1 className="nav-heading">UNI Restro Cafe</h1>
            </li>
            <li className="nav-list-item">
              <p>My Orders</p>
              <Link className="cart-link" to="/cart">
                <IoIosCart size={25} />
                <p className="list-count">{cartList.length} </p>
              </Link>
            </li>
          </ul>
        </nav>
      )
    }}
  </CartContext.Consumer>
)

export default Navbar
