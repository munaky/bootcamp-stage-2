import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/useAuth';
import UserRoutes from './routes/UserRoutes';
import GuestRoutes from './routes/GuestRoutes';
import AdminRoutes from './routes/AdminRoutes';

function App() {
    const { user } = useAuth();
    const role = user?.role || 'GUEST';
    let routes = <></>;

    if (role === 'USER') {
        routes = (<UserRoutes />);
    }
    else if(role === 'ADMIN'){
        routes = (<AdminRoutes />);
    }
    else{
        routes = (<GuestRoutes />);
    }

    return (
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    )
}

export default App
