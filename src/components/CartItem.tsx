import { Edit, Save, Trash2, Plus, Minus } from 'lucide-react';
import type { Item } from '../types/cart';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

export const CartItem = ({ item }: { item: Item }) => {
    const { updateItem, deleteItem } = useCart();
    const [editing, setEditing] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(item.quantity);

    const handleSave = () => {
        setEditing(false);
        if(quantity < 1) {
            deleteItem(item.id);
            return;
        }

        updateItem(item.id, quantity);
    };

    const handleDecrease = () => {
        quantity < 1 ? setQuantity(0) : setQuantity(quantity - 1)
    }

    return (
        <>
            <li className="flex justify-between items-center border-b pb-2">
                <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                        Rp {item.price.toLocaleString()} x {item.quantity}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    {editing ?
                        (
                            <>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600" >
                                    <Plus className='h-5 w-5' />
                                </button>
                                <input 
                                type="number"
                                readOnly
                                 value={quantity}
                                  className='w-[5ch] text-center border-2 rounded border-indigo-100 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0' />
                                <button
                                    onClick={handleDecrease}
                                    className="p-1 text-sm rounded bg-red-500 text-white hover:bg-red-600" >
                                    <Minus className='h-5 w-5' />
                                </button>
                                <button
                                    onClick={() => deleteItem(item.id)}
                                    className="p-1 text-sm rounded bg-red-500 text-white hover:bg-red-600" >
                                    <Trash2 className='h-5 w-5' />
                                </button>
                                <button
                                onClick={handleSave}
                                    className="p-1 text-sm rounded bg-green-500 text-white hover:bg-green-600" >
                                    <Save className='h-5 w-5' />
                                </button>
                            </>
                        )
                        :
                        (
                            <>
                                <span className="text-sm font-semibold">
                                    Rp {(item.price * item.quantity).toLocaleString()}
                                </span>
                                <button
                                    onClick={() => setEditing(true)}
                                    className="p-1 text-sm rounded bg-green-500 text-white hover:bg-green-600" >
                                    <Edit className='h-5 w-5' />
                                </button>
                            </>
                        )
                    }
                </div>
            </li>
        </>
    )
}