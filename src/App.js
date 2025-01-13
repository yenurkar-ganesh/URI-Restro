import './App.css'
import {useState, useEffect} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import CartContext from './context/CartContext'

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
      //   console.log(isDishExist)

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
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App
