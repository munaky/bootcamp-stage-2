import { useState } from "react";
import { type Product } from "../types/product";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { useCart } from "../hooks/useCart";
import { Minus, Plus } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
    const { cart, addItem } = useCart();
    const [quantity, setQuantity] = useState<number>(0);
    const inCart = cart.findIndex(item => item.id === product.id) != -1 ? true : false;

    function handleAddItem() {
        addItem(product, quantity)
    }

    const handleDecrease = () => {
        quantity < 1 ? setQuantity(0) : setQuantity(quantity - 1)
    }

    return (
        <Dialog>
            <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className={"absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md z-10 shadow " +
                    (inCart ? 'visible' : 'hidden')}>
                    Added
                </div>

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
                            <div className="flex gap-4 justify-between items-center mt-2">
                                <DialogTrigger className="font-semibold bg-red-500 text-white text-sm py-2 px-4 rounded hover:bg-red-600 transition-colors">
                                    Close
                                </DialogTrigger>
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600" >
                                        <Plus className='h-5 w-5' />
                                    </button>
                                    <input
                                        type="number"
                                        readOnly
                                        value={quantity}
                                        className='w-[5ch] text-center border-2 rounded border-indigo-100 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0' />
                                    <button
                                        onClick={handleDecrease}
                                        className="p-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600" >
                                        <Minus className='h-5 w-5' />
                                    </button>
                                </div>
                                <DialogTrigger onClick={handleAddItem} className="font-semibold bg-green-500 text-white text-sm py-2 px-4 rounded hover:bg-green-600 transition-colors">
                                    Add to Cart
                                </DialogTrigger>
                            </div>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};
