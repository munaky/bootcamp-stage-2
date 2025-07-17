import React, { useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { type Item } from '../types/cart';
import type { Product } from '../types/product';
import userAPI from '../api/user';
import { useToast } from '../hooks/useToast';

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const { addToast } = useToast();
  const [cart, setCart] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    userAPI.get('/cart')
      .then(async (r) => {
        const res = await r.data;

        if (res.status === 'success') {
          const data = res.data.map(((item: any) => {
            return {
              ...item.product,
              quantity: item.quantity,
              cartId: item.id,
            }
          }))

          console.log(data)
          setCart(data);
        }
      })
      .catch(e => {
        console.log(e);
        addToast({ type: 'error', title: 'Error!', description: 'Unable to retrieve cart items.' });
      });
  }, [])

  const addItem = (item: Product, quantity: number = 1) => {
    setLoading(true);
    const itemIndex = cart.findIndex(i => i.id === item.id);

    userAPI.post('/cart/add', {
      productId: item.id,
      quantity
    })
      .then(async (r) => {
        const res = await r.data;
        console.log(res)

        if (res.status === 'success') {
          if (itemIndex !== -1) {
            const updatedCart = cart.map((i, index) =>
              index === itemIndex
                ? { ...i, quantity: i.quantity + quantity }
                : {...i}
            );
            setCart(updatedCart);
          } else {
            setCart([...cart, { ...item, quantity, cartId: res.data.id }]);
          }

          addToast({ type: 'success', title: 'Success!', description: 'Item added to cart.', duration: 1000 });
        }
      })
      .catch(e => {
        console.log(e)
        addToast({ type: 'error', title: 'Error!', description: 'Unable add item to cart.' });
      })
      .finally(() => setLoading(false))

  };

  const updateItem = (item: Item, quantity: number) => {
    setLoading(true);

    userAPI.put(`/cart/update/${item.cartId}`, {
      quantity
    })
      .then(async (r) => {
        const res = await r.data;

        if (res.status === 'success') {
          setCart(prev => prev.map(item => {
            if (item.id == item.id) item.quantity = quantity;
            return item;
          }));
        }
      })
      .catch(e => {
        console.log(e)
        addToast({ type: 'error', title: 'Error!', description: 'Unable update item.' });
      })
      .finally(() => setLoading(false))
  }

  const deleteItem = (item: Item) => {
    setLoading(true);
    
    userAPI.delete(`/cart/delete/${item.cartId}`)
      .then(async (r) => {
        const res = await r.data;

        if (res.status === 'success') {
          setCart(prev => prev.filter(i => i.id != item.id));
        }
      })
      .catch(e => {
        console.log(e)
        addToast({ type: 'error', title: 'Error!', description: 'Unable delete item.' });
      })
      .finally(() => setLoading(false))
  }

  const deleteAll = () => {
    setLoading(true);
    
    userAPI.delete(`/cart/clear`)
      .then(async (r) => {
        const res = await r.data;

        if (res.status === 'success') {
          setCart([]);
        }
      })
      .catch(e => {
        console.log(e)
        addToast({ type: 'error', title: 'Error!', description: 'Unable clear item.' });
      })
      .finally(() => setLoading(false))
  }


  return (
    <CartContext value={{ cart, setCart, updateItem, addItem, deleteItem, deleteAll, loading }}>
      {children}
    </CartContext>
  );
};