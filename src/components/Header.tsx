import { Link, useNavigate } from "react-router-dom"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { useAuth } from "../hooks/useAuth"
import { Button } from "./ui/button"
import ThemeToggle from "../lib/ToggleTheme"

export default function Header() {
    const {logout} = useAuth()
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className="flex justify-center py-4 gap-4">
            <NavigationMenu viewport={false}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link to="/products">Products</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Button onClick={handleLogout} variant={'destructive'} className="self-end">
                Logout
            </Button>
            <ThemeToggle />
        </div>
    )
}