import {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import CartContext from './context/CartContext'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [cartList, setCartList] = useState(() => {
    try {
      const storedCart = localStorage.getItem('storedCart')
      return storedCart ? JSON.parse(storedCart) : []
    } catch (error) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('storedCart', JSON.stringify(cartList))
  }, [cartList])

  const setAndStoreCart = newCart => {
    setCartList(newCart)
    localStorage.setItem('storedCart', JSON.stringify(newCart))
  }

  const addCartItem = product => {
    setAndStoreCart(prevCartList => {
      const existingProduct = prevCartList.find(
        item => item.dish_id === product.dish_id,
      )
      if (existingProduct) {
        return prevCartList.map(item =>
          item.dish_id === product.dish_id
            ? {
                ...item,
                quantity: (item.quantity || 1) + (product.quantity || 1),
              }
            : item,
        )
      }
      return [...prevCartList, {...product, quantity: product.quantity || 1}]
    })
  }

  const removeCartItem = productId => {
    setAndStoreCart(prevCartList =>
      prevCartList.filter(item => item.dish_id !== productId),
    )
  }

  const incrementCartItemQuantity = productId => {
    setAndStoreCart(prevCartList =>
      prevCartList.map(item =>
        item.dish_id === productId
          ? {...item, quantity: item.quantity + 1}
          : item,
      ),
    )
  }

  const decrementCartItemQuantity = productId => {
    setAndStoreCart(prevCartList =>
      prevCartList.map(item =>
        item.dish_id === productId
          ? {...item, quantity: Math.max(0, item.quantity - 1)}
          : item,
      ),
    )
  }

  const removeAllCartItems = () => {
    setAndStoreCart([])
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
