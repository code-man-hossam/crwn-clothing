import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import { UserContext } from "../../contexts/user.context"
import { CartContext } from "../../contexts/cart.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import "./navigation.styles.scss"

const Navigation = () => {
   const { currentUser } = useContext(UserContext)
   const { isCartOpen } = useContext(CartContext)

   return (
      <Fragment>
         <div className="navigation">
            <Link to="/" className="logo-container">
               <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container">
               <Link to="/shop" className="nav-link">
                  SHOP
               </Link>
               {currentUser ? (
                  <span className="nav-link" onClick={signOutUser}>
                     SIGN OUT
                  </span>
               ) : (
                  <Link to="/auth" className="nav-link">
                     SIGN IN
                  </Link>
               )}
               <CartIcon />
            </div>
            {isCartOpen && <CardDropdown />}
         </div>
         <Outlet />
      </Fragment>
   )
}

export default Navigation
