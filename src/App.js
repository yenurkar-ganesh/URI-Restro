import './App.css'
import {useState} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import CartContext from './context/CartContext'

const App = () => {
  const [cartList, setCartList] = useState([])

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
                quantity: (eachItem.quantity || 0) + 1, // Fix: Properly increment quantity
              }
            : eachItem,
        )
      }

      return [
        ...prevList,
        {
          ...dish,
          id: dish.dish_id, // Ensure the correct `id` field is added
          quantity: 1, // Set initial quantity to 1 for new items
        },
      ]
    })
    console.log(`added`)
  }

  console.log(cartList)
  const decrementHandler = () => {}

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
