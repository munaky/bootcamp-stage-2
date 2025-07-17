import { CartItem } from "../../components/user/CartItem";
import { Spinner } from "../../components/Spinner";
import { useCart } from "../../hooks/useCart";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { CheckoutDialog } from "../../components/user/CheckoutDialog";
import userAPI from "../../api/user";

export default function Cart() {
  const { cart, setCart, deleteAll, loading } = useCart();
  const [openCheckout, setOpenCheckout] = useState(false);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatCurrency = (value: number) => 
   `Rp ${value.toLocaleString("id-ID")}`;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mr-2">Your Cart</h2>
        {loading && <Spinner />}
        {cart.length > 0 && (
          <Button
            variant="destructive"
            onClick={deleteAll}
            className="ml-auto"
          >
            Clear Cart
          </Button>
        )}
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-xl font-bold">
              {formatCurrency(totalPrice)}
            </span>
          </div>
          <div className="mt-6 text-right">
            <Button size="lg" onClick={() => setOpenCheckout(true)}>
              Checkout
            </Button>
          </div>
        </>
      )}

      <CheckoutDialog open={openCheckout} onOpenChange={setOpenCheckout} total={totalPrice} />
    </div>
  );
}
