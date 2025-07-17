import { Minus, Plus, Trash2 } from "lucide-react";
import type { Item } from "../../types/cart";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import { Button } from "../ui/button";

export const CartItem = ({ item }: { item: Item }) => {
  const { updateItem, deleteItem } = useCart();
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const formatCurrency = (value: number) =>
    `Rp ${value.toLocaleString("id-ID")}`;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity < 1) {
      deleteItem(item);
    } else {
      setQuantity(newQuantity);
      updateItem(item, newQuantity);
    }
  };

  return (
    <li className="flex gap-4 items-center border-b pb-4">
      <img
        src={'http://localhost:3000/images/'+item.image}
        alt={item.name}
        className="w-16 h-16 rounded object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-sm text-gray-500">
          {formatCurrency(item.price)} x {quantity}
        </p>
        <p className="text-sm font-medium text-gray-700 mt-1">
          Subtotal: {formatCurrency(item.price * quantity)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 ml-auto"
            onClick={() => deleteItem(item)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </li>
  );
};
