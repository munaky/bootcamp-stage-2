import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useCart } from "../../hooks/useCart";
import { Spinner } from "../Spinner";
import { useState } from "react";
import { ShoppingCart, Package, ListOrdered, User, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { useAuth } from "../../hooks/useAuth";
import EditProfileDialog from "./EditProfileDialog";

export default function Header() {
  const navigate = useNavigate();
  const {user, logout} = useAuth();
  console.log(user)
  const { cart } = useCart();
  const [activeMenu, setActiveMenu] = useState("");

  const navItemClasses = (menu: string) =>
    `flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
      activeMenu === menu
        ? "bg-indigo-100 text-indigo-700 font-semibold ring-2 ring-indigo-300"
        : "text-gray-700 hover:bg-indigo-50"
    }`;

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600 whitespace-nowrap">
          Olshop
        </Link>

        {/* Search Bar */}
        

        {/* Navigation + Cart */}
        <nav className="flex gap-2 items-center">
          <Button asChild variant="ghost" onClick={() => setActiveMenu("products")}>
            <Link to="/" className={navItemClasses("products")}>
              <Package size={18} />
              Products
            </Link>
          </Button>

          <Button asChild variant="ghost" onClick={() => setActiveMenu("orders")}>
            <Link to="/orders" className={navItemClasses("orders")}>
              <ListOrdered size={18} />
              Orders
            </Link>
          </Button>

          <Button asChild variant="ghost" onClick={() => setActiveMenu("cart")}>
            <Link to="/cart" className={navItemClasses("cart") + " relative"}>
              <ShoppingCart size={18} />
              Cart
              {totalItems > 0 && (
                <span className="ml-1 text-sm font-semibold text-yellow-600 bg-yellow-100 px-2 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
        </nav>

        {/* Spinner + User */}
        <div className="flex items-center gap-4">
          <div>
            {user?.name}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={'http://localhost:3000/images/' + user?.image} alt="User" />
                <AvatarFallback><User size={16} /></AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="w-fit mx-auto text-sm rounded-full px-2 font-semibold bg-indigo-400 text-white">{user?.customer?.point || 0}</div>
              <div className="border-b-1 my-1"></div>
              <div className="flex flex-col space-y-2 items-center">
              <EditProfileDialog />
              <div onClick={handleLogout}>Logout</div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
