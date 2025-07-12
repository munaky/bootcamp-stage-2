import { CartItem } from "../components/CartItem";
import { Spinner } from "../components/Spinner";
import { useCart } from "../hooks/useCart";

export default function Cart() {    
    const { cart, deleteAll, loading } = useCart();

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-md mx-auto p-4 mt-8 bg-white rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 items-center">
                <h2 className="text-xl font-bold">Cart</h2>
                {loading && <Spinner />}
            </div>
            {(cart.length != 0) && <button onClick={() => deleteAll()} className="px-2 py-1 h-fit rounded text-white bg-red-500 hover:bg-red-600">Clear</button>}
            </div>
            <ul className="space-y-4">
                {cart.map(item => (
                    <CartItem key={item.id} item={item}/>
                ))}
            </ul>
            <div className="mt-4 text-right font-bold text-lg">
                Total: Rp {totalPrice.toLocaleString()}
            </div>
        </div>
    );
}