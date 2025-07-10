import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Products from './pages/Products';
import Posts from './pages/Cart';
import PostDetail from './pages/PostDetail';
import Header from './components/Header';

function App() {
    return (
        <BrowserRouter>
                <Header />

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/posts' element={<Posts />}>
                        <Route path=':id' element={<PostDetail />} />
                    </Route>
                </Routes>
        </BrowserRouter>
    )
}

export default App
