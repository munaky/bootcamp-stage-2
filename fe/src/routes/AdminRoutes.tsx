import { Route, Routes } from "react-router-dom";
import Products from "../pages/admin/Products";
import Header from "../components/admin/Header";

export default function AdminRoutes() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<Products/>} />
            </Routes>
        </>
    )
}