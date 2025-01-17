import './App.css'
import {useState, useEffect} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import Login from './components/Login'
import CartContext from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [cartList, setCartList] = useState(() => {
    const storedCart = localStorage.getItem('cartList')
    return storedCart ? JSON.parse(storedCart) : []
  })

  const incrementHandler = dish => {
    setCartList(prevList => {
      const isDishExist = prevList.find(
        eachDish => eachDish.id === dish.dish_id,
      )

      if (isDishExist) {
        return prevList.map(eachItem =>
          eachItem.id === dish.dish_id
            ? {
                ...eachItem,
                quantity: (eachItem.quantity || 0) + 1,
              }
            : eachItem,
        )
      }

      return [
        ...prevList,
        {
          ...dish,
          id: dish.dish_id,
          quantity: 1,
        },
      ]
    })
    console.log(`added`)
  }
  const decrementHandler = dish => {
    setCartList(prevList => {
      const updatedList = prevList
        .map(eachItem => {
          if (eachItem.id === dish.dish_id) {
            const updatedQuantity = eachItem.quantity - 1
            return updatedQuantity > 0
              ? {
                  ...eachItem,
                  quantity: updatedQuantity,
                }
              : null
          }
          return eachItem
        })
        .filter(item => item !== null) // Remove items with null

      return updatedList // Ensure the updated list is returned
    })
  }

  const removeAllCartItems = () => {
    setCartList([])
    localStorage.removeItem('cartList', JSON.stringify(cartList))
  }

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList))
  }, [cartList])

  console.log(cartList)

  return (
    <CartContext.Provider
      value={{
        cartList,
        incrementToCartHandler: incrementHandler,
        decrementToCartHandler: decrementHandler,
        removeAllCartItems: removeAllCartItems,
      }}
    >
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App
