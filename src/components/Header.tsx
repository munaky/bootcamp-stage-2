import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Button } from "./ui/button"
import ThemeToggle from "../lib/ToggleTheme"

export default function Header() {
    const { logout, token } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className="flex py-4 px-8 border-b-1 mb-8 border-blue-400 dark:border-yellow-500">
            <div className="grow flex gap-4">
                <Button asChild variant={'ghost'} className="text-lg font-semibold">
                    <Link to='/'>Movie List</Link>
                </Button>
                <Button asChild variant={'ghost'} className="text-lg font-semibold">
                    <Link to='/favorites'>Favorite</Link>
                </Button>
            </div>
            <div className="flex gap-4">
                {token ?
                    (
                        <Button onClick={handleLogout} variant={'destructive'} className="text-lg font-semibold">
                            Logout
                        </Button>
                    )
                    :
                    (
                        <Button asChild variant={'default'} className="text-lg font-semibold bg-green-500 hover:bg-green-600 dark:text-white">
                            <Link to='/login'>Login</Link>
                        </Button>
                    )
                }
                <ThemeToggle />
            </div>
        </div>
    )
}