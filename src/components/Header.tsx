import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Header(){
    const [menu, setMenu] = useState(0);
    const active = 'font-semibold py-1 rounded-full text-lg ring-2 ring-indigo-300 bg-indigo-100 text-indigo-700';
    const notActive = 'font-semibold py-1 rounded-full text-lg ring-2 ring-indigo-300 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700';
    
    return (
        <div className='flex justify-center gap-4 border-b-2 py-3'>
                <Button asChild onClick={() => (setMenu(0))} variant={'ghost'} className={menu == 0 ? active : notActive}>
                    <Link to={'/'}>Home</Link>
                </Button>
                <Button asChild onClick={() => setMenu(1)} variant={'ghost'} className={menu == 1 ? active : notActive}>
                    <Link to={'/products'}>Products</Link>
                </Button>
                <Button asChild onClick={() => setMenu(2)} variant={'ghost'} className={menu == 2 ? active : notActive}>
                    <Link to={'/cart'}>
                    Cart 
                    </Link>
                </Button>
            </div>
    )
}