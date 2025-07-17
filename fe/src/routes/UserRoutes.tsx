import { Route, Routes } from "react-router-dom";
import Cart from "../pages/user/Cart";
import Orders from "../pages/user/Orders";
import Products from "../pages/user/Products";
import Header from "../components/user/Header";
import { CartProvider } from '../contexts/CartProvider.tsx';

export default function UserRoutes() {
    return (
        <CartProvider>
            <Header/>
            <Routes>
                <Route path='/' element={<Products/>} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/orders' element={<Orders />} />
            </Routes>
        </CartProvider>
    )
}