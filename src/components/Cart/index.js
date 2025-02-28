import React from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import Navbar from '../Navbar'
import './index.css'

const Cart = () => (
  <>
    <Navbar />
    <h1>Cart</h1>
    <CartContext.Consumer>
      {value => {
        const {
          cartList,
          removeAllCartItems,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        if (!Array.isArray(cartList) || cartList.length === 0) {
          return (
            <div className="empty-cart">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="empty cart"
                className="empty-cart-image"
              />
              <p className="empty-cart-message">Your Cart is Empty</p>
            </div>
          )
        }

        const totalAmount = cartList.reduce(
          (sum, item) => sum + item.dish_price * item.quantity,
          0,
        )
        const totalItems = cartList.reduce(
          (sum, item) => sum + item.quantity,
          0,
        )

        return (
          <div className="cart-view-container">
            <ul className="cart-list">
              {cartList.map(eachCartItem => {
                const onIncrement = () =>
                  incrementCartItemQuantity(eachCartItem.dish_id)
                const onDecrement = () =>
                  decrementCartItemQuantity(eachCartItem.dish_id)
                const onRemove = () => removeCartItem(eachCartItem.dish_id)

                return (
                  <li key={eachCartItem.dish_id} className="cart-item">
                    <img
                      className="cart-product-image"
                      src={eachCartItem.dish_image}
                      alt={eachCartItem.dish_name}
                      data-testid="dishImage"
                    />

                    <div className="cart-item-details-container">
                      <div className="cart-product-title-brand-container">
                        <p
                          className="cart-product-title"
                          data-testid="dishName"
                        >
                          {eachCartItem.dish_name}
                        </p>
                        <section className="dish-price-section">
                          <p className="cart-product-brand">
                            {eachCartItem.dish_currency}
                          </p>
                          <p className="cart-product-brand">
                            {eachCartItem.dish_price}
                          </p>
                        </section>
                      </div>
                      <div className="cart-quantity-container">
                        <button
                          onClick={onDecrement}
                          type="button"
                          className="quantity-controller-button"
                          data-testid="decrementBtn"
                        >
                          -
                        </button>
                        <p
                          className="cart-quantity"
                          data-testid={`quantity-${eachCartItem.dish_id}`}
                        >
                          {eachCartItem.quantity}
                        </p>
                        <button
                          type="button"
                          onClick={onIncrement}
                          className="quantity-controller-button"
                          data-testid="incrementBtn"
                        >
                          +
                        </button>
                      </div>
                      <div className="total-price-remove-container">
                        <p className="cart-total-price">
                          {eachCartItem.dish_currency}{' '}
                          {eachCartItem.dish_price * eachCartItem.quantity}/-
                        </p>
                        <button
                          type="button"
                          className="remove-button"
                          onClick={onRemove}
                          aria-label="Remove item"
                          data-testid="remove"
                        >
                          <AiFillCloseCircle color="#D9534F" size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="cart-summary">
              <h1 className="order-total-heading">
                Order Total: SAR {totalAmount}/-
              </h1>
              <p className="cart-count" data-testid="cart-count">
                {totalItems} items in cart
              </p>
              <div className="btn-section">
                <button
                  type="button"
                  className="remove-all-button"
                  onClick={removeAllCartItems}
                  data-testid="remove-all"
                >
                  Remove All
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  </>
)

export default Cart
