import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Separator } from '../../components/ui/separator';
import userAPI from '../../api/user';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: number;
  date: string;
  total: number;
  items: OrderItem[];
}

const dummyOrders: Order[] = [
  {
    id: 1,
    date: '2025-07-14',
    total: 239.97,
    items: [
      {
        product: {
          id: 101,
          name: 'Wireless Headphones',
          description: 'test',
          price: 79.99,
          stock: 10,
          image: 'example.png',
        },
        quantity: 3,
      },
    ],
  },
  {
    id: 2,
    date: '2025-07-10',
    total: 149.98,
    items: [
      {
        product: {
          id: 102,
          name: 'Smart Watch',
          description: 'test',
          price: 149.98,
          stock: 5,
          image: 'example.png',
        },
        quantity: 1,
      },
    ],
  },
];

const OrderItemDetails: React.FC<{ item: OrderItem }> = ({ item }) => (
  <div className="flex gap-4 items-start py-2">
    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover" />
    <div>
      <h4 className="font-semibold text-lg">{item.product.name}</h4>
      <p className="text-sm text-muted-foreground">{item.product.description}</p>
      <p className="text-sm">Qty: {item.quantity}</p>
      <p className="text-sm">Price: ${(item.product.price * item.quantity).toFixed(2)}</p>
    </div>
  </div>
);

const Orders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  let orders = [];

  useEffect(() => {
        userAPI.get('/orders')
        .then(async (r) => {
            const res = await r.data;

            console.log(res)
        })
        .catch(e => console.log(e));
    }, [])

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {/* {dummyOrders.map((order) => (
        <Card key={order.id} className="hover:shadow-md transition duration-300">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Order{order.id}</p>
              <p className="text-sm text-muted-foreground">Date: {order.date}</p>
              <p className="text-sm text-muted-foreground">Items: {order.items.length}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedOrder(order)} variant="outline">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Order #{selectedOrder?.id} Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {selectedOrder?.items.map((item, index) => (
                      <div key={index}>
                        <OrderItemDetails item={item} />
                        {index < selectedOrder.items.length - 1 && <Separator />}
                      </div>
                    ))}
                    <Separator />
                    <div className="text-right font-bold text-lg">
                      Total: ${selectedOrder?.total.toFixed(2)}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))} */}
    </div>
  );
};

export default Orders;
