import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import Header from './components/Header';

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/posts' element={<Posts />}>
                    <Route path=':id' element={<PostDetail />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
