import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import PrivateRoute from './lib/PrivateRoute';
import Header from './components/Header';
import Movies from './pages/Movies';
import Favorites from './pages/Favorites'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={(
                    <>
                        <Header />
                        <Movies />
                    </>
                )} />
                <Route path='/favorites' element={(
                    <PrivateRoute>
                        <Favorites />
                    </PrivateRoute>
                )} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
