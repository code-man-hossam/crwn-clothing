import { useState, createContext, useEffect } from "react"

const addCartItem = (cartItems, productToAdd) => {
   const existingProduct = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
   )

   if (existingProduct) {
      return cartItems.map((cartItem) =>
         cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
      )
   }

   return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
   const existingProduct = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
   )

   if (existingProduct.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
   }

   return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
         ? { ...cartItem, quantity: cartItem.quantity - 1 }
         : cartItem
   )
}

const clearCartItem = (cartItems, clearItem) =>
   cartItems.filter((cartItem) => cartItem.id !== clearItem.id)

export const CartContext = createContext({
   isCartOpen: false,
   setIsCartOpen: () => {},
   cartItems: [],
   addItemToCart: () => {},
   cartCount: 0,
   clearItemFromCart: () => {},
   removeItemToCart: () => {},
   total: 0,
})

export const CartProvider = ({ children }) => {
   const [isCartOpen, setIsCartOpen] = useState(false)
   const [cartItems, setCartItems] = useState([])
   const [cartCount, setCartCount] = useState(0)
   const [cartTotal, setCartTotal] = useState(0)

   useEffect(() => {
      const newCartCount = cartItems.reduce(
         (total, cartItem) => total + cartItem.quantity,
         0
      )
      setCartCount(newCartCount)
   }, [cartItems])

   useEffect(() => {
      const newCartTotal = cartItems.reduce(
         (total, cartItem) => total + cartItem.quantity * cartItem.price,
         0
      )
      setCartTotal(newCartTotal)
   }, [cartItems])

   const addItemToCart = (product) => {
      setCartItems(addCartItem(cartItems, product))
   }

   const removeItemToCart = (removeItem) => {
      setCartItems(removeCartItem(cartItems, removeItem))
   }

   const clearItemFromCart = (clearItem) => {
      setCartItems(clearCartItem(cartItems, clearItem))
   }

   const value = {
      isCartOpen,
      setIsCartOpen,
      addItemToCart,
      cartItems,
      removeItemToCart,
      cartCount,
      clearItemFromCart,
      cartTotal,
   }

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
