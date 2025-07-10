import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function Cart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('error context');
    const { cart, setCart } = context;

    const handleDecrease = (id: number) => {
        const newCart: any = cart.map(item => {
            if(item.id == id) item.quantity -= 1
            if(item.quantity == 0) (item as any) = null;

            return item;
        })
            .filter(item => item);

        setCart(newCart);
    };

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-md mx-auto p-4 mt-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Keranjang Belanja</h2>
            <ul className="space-y-4">
                {cart.map(item => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center border-b pb-2"
                    >
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                                Rp {item.price.toLocaleString()} x {item.quantity}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleDecrease(item.id)}
                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            >
                                Kurangi
                            </button>
                            <span className="text-sm font-semibold">
                                Rp {(item.price * item.quantity).toLocaleString()}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-4 text-right font-bold text-lg">
                Total: Rp {totalPrice.toLocaleString()}
            </div>
        </div>
    );
}