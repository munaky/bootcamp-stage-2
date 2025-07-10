import { useContext } from "react";
import { type Product } from "../data/products";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { CartContext } from "../contexts/CartContext";

export default function ProductCard({ product }: { product: Product }) {
    const context = useContext(CartContext)
    if (!context) throw new Error('error context');
    const {cart, setCart} = context;

    function handleAddItem(product: Product){
        const isExist = cart.findIndex(i => i.id == product.id);
        if(isExist != -1){
            cart[isExist].quantity += 1
        }
        else {
            (cart as any).push({...product, quantity: 1})
        }

        setCart(cart);
    }

    return (
        <Dialog>
            <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* <div className={"absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md z-10 shadow " +
                (product.added ? 'visible' : 'hidden')}>
                Added
            </div> */}

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-600 font-medium">Rp{product.price.toLocaleString('id-ID')}</p>
                    <DialogTrigger className="mt-2 font-semibold bg-blue-600 text-white text-sm py-2 px-4 rounded hover:bg-blue-700 transition-colors">
View Detail
                    </DialogTrigger>

                </div>
            </div>
            <DialogContent className="w-fit">
                <DialogHeader>
                    <DialogTitle className="text-center text-blue-700 mb-3">Product Detail</DialogTitle>
                    
                        <div className="flex flex-col items-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="rounded-lg w-54 h-54 object-cover"
                            />
                            <div className="py-4 flex flex-col gap-2">
                                <div>
                                    <h2 className="text-lg text-black font-semibold">{product.name}</h2>
                                    <p className="text-yellow-500 text-black font-semibold">Rp{product.price.toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <DialogDescription className="text-gray-600 text-black font-medium">
{product.description}
                                    </DialogDescription>
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <DialogTrigger className="mt-2 font-semibold bg-red-500 text-white text-sm py-2 px-4 rounded hover:bg-red-600 transition-colors">
                                        Close
                                    </DialogTrigger>
                                    <button onClick={() => handleAddItem(product)} className="mt-2 font-semibold bg-yellow-500 text-white text-sm py-2 px-4 rounded hover:bg-yellow-600 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};
