import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import RegisterAdmin from "../pages/auth/RegisterAdmin";
import RegisterUser from "../pages/auth/RegisterUser";
import Products from "../pages/user/Products";

export default function GuestRoutes() {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register-admin' element={<RegisterAdmin />} />
                <Route path='/register-user' element={<RegisterUser />} />
                <Route path='/' element={<Login />} />
            </Routes>
        </>
    )
}