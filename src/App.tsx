import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './pages/Products';
import Cart from './pages/Cart';
import Header from './components/Header';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Products />} />
                <Route path='/cart' element={<Cart />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
