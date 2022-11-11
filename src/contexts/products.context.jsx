import { useState, createContext } from "react"
import PRODUCTS from "../shop-data.json"

export const ProductsConext = createContext({
   products: [],
})

export const ProductsProvider = ({ children }) => {
   const [products, setProducts] = useState(PRODUCTS)
   const value = { products }

   return (
      <ProductsConext.Provider value={value}>
         {children}
      </ProductsConext.Provider>
   )
}
