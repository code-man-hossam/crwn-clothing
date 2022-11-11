import { useContext } from "react"
import { ProductsConext } from "../../contexts/products.context"
import ProductCard from "../../components/product-card/product-card.component"
import "./shop.styles.scss"

const Shop = () => {
   const { products } = useContext(ProductsConext)

   return (
      <div className="product-container">
         {products.map((product) => {
            return <ProductCard key={product.id} product={product} />
         })}
      </div>
   )
}

export default Shop
