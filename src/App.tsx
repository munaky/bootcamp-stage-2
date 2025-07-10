import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import PrivateRoute from './lib/PrivateRoute';
import Products from './pages/Products';

function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/products' element={(
                    <PrivateRoute>
                        <Products />
                    </PrivateRoute>
                )} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
