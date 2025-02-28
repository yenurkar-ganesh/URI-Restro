import {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import CartContext from './context/CartContext'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [cartList, setCartList] = useState(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartList))
  }, [cartList])

  const addCartItem = product => {
    setCartList(prevCartList => {
      const existingProduct = prevCartList.find(
        item => item.dish_id === product.dish_id,
      )
      if (existingProduct) {
        return prevCartList.map(item =>
          item.dish_id === product.dish_id
            ? {...item, quantity: item.quantity + product.quantity}
            : item,
        )
      }
      return [...prevCartList, product]
    })
  }

  const removeCartItem = productId => {
    setCartList(prevCartList =>
      prevCartList.filter(item => item.dish_id !== productId),
    )
  }

  const incrementCartItemQuantity = productId => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.dish_id === productId
          ? {...item, quantity: item.quantity + 1}
          : item,
      ),
    )
  }

  const decrementCartItemQuantity = productId => {
    setCartList(prevCartList =>
      prevCartList
        .map(item =>
          item.dish_id === productId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const removeAllCartItems = () => {
    setCartList([])
  }
  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
