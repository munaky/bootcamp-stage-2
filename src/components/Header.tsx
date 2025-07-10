import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Header(){
    const [menu, setMenu] = useState(0);
    const active = 'font-semibold border-b-2 border-orange-500';
    const notActive = 'font-medium hover:font-semibold hover:border-b-2 hover:border-orange-500';
    
    return (
        <div className='flex justify-center gap-4 my-4'>
                <Button asChild onClick={() => (setMenu(0))} variant={'ghost'} className={'rounded-none text-2xl ' + (menu == 0 ? active : notActive)}>
                    <Link to={'/'}>Home</Link>
                </Button>
                <Button asChild onClick={() => setMenu(1)} variant={'ghost'} className={'rounded-none text-2xl ' + (menu == 1 ? active : notActive)}>
                    <Link to={'/about'}>About</Link>
                </Button>
                <Button asChild onClick={() => setMenu(2)} variant={'ghost'} className={'rounded-none text-2xl ' + (menu == 2 ? active : notActive)}>
                    <Link to={'/posts'}>Posts</Link>
                </Button>
            </div>
    )
}