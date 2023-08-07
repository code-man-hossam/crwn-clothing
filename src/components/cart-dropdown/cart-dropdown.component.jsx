import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/cart.context'
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

const CartDropdown = () => {

    const {cartItems} = useContext(CartContext)
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))
                ) : <EmptyMessage>Your cart is empty</EmptyMessage>}
            </CartItems>
            <Button onClick={handleNavigate}>Go To Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown