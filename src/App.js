import './App.css'
import {useState, useEffect} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Home from './components/Home'
import CartRoute from './components/CartRoute'
import Login from './components/Login'
import CartContext from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [cartList, setCartList] = useState(() => {
    const storedCart = localStorage.getItem('cartList')
    return storedCart ? JSON.parse(storedCart) : []
  })

  const incrementCartItemQuantity = dish => {
    setCartList(prevList =>
      prevList.map(eachDish =>
        eachDish.dish_id === dish.dish_id
          ? {...eachDish, quantity: eachDish.quantity + 1}
          : eachDish,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prevList =>
      prevList.map(item =>
        item.dish_id === dishId && item.quantity > 0
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    )
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const removeCartItem = dishId => {
    setCartList(prevList =>
      prevList.filter(eachDish => eachDish.dish_id !== dishId),
    )
  }

  const addCartItem = newItem => {
    setCartList(prevList => {
      const existingItem = prevList.find(
        item => item.dish_id === newItem.dish_id,
      )

      if (existingItem) {
        return prevList.map(item =>
          item.dish_id === newItem.dish_id
            ? {...item, quantity: item.quantity + newItem.quantity}
            : item,
        )
      }
      return [...prevList, newItem]
    })
  }

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList))
  }, [cartList])

  return (
    <CartContext.Provider
      value={{
        cartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
        removeCartItem,
        addCartItem,
      }}
    >
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cart" component={CartRoute} />
        </Switch>
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App
