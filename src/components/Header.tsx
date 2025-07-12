import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { Spinner } from "./Spinner";

export default function Header(){
    const {cart, loading} = useCart();
    const [menu, setMenu] = useState(-1);
    const active = 'font-semibold py-1 rounded-full text-lg ring-2 ring-indigo-300 bg-indigo-100 text-indigo-700';
    const notActive = 'font-semibold py-1 rounded-full text-lg ring-2 ring-indigo-300 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700';

    return (
        <div className='relative flex justify-center items-center gap-4 border-b-2 py-3'>
                <Button asChild onClick={() => setMenu(1)} variant={'ghost'} className={menu == 1 ? active : notActive}>
                    <Link to={'/'}>Products</Link>
                </Button>
                <Button asChild onClick={() => setMenu(2)} variant={'ghost'} className={menu == 2 ? active : notActive}>
                    <Link to={'/cart'}>
                    Cart <span className="font-semibold text-yellow-500">{cart.reduce((total, item) => (total + item.quantity), 0)}</span>
                    </Link>
                </Button>
                {loading && <div className="absolute right-4"><Spinner /></div>}
            </div>
    )
}