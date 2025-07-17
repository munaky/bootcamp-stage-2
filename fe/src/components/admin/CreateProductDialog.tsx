import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import userAPI from "../../api/user";
import { useToast } from "../../hooks/useToast";
import authAPI from "../../api/auth";
import adminAPI from "../../api/admin";



export default function CreateProductDialog({ setProducts }: { setProducts: any }) {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    adminAPI.post('/products/create', {
      ...(formData?.name ? { name: formData.name } : {}),
      ...(formData?.price ? { price: formData.price } : {}),
      ...(formData?.stock ? { stock: formData.stock } : {}),
    })
      .then(async (r) => {
        const res = await r.data;
        const data = res.data;

        console.log(res)

        if (res.status === 'success') {

          setProducts((prev: any) => [...prev, data])

          addToast({ type: 'success', title: 'Created!', description: 'Product Created.', duration: 1000 });
        }
      })
      .catch(e => {
        console.log(e)
        addToast({ type: 'error', title: 'Error!', description: 'Failed to create product.' });
      })

  };

  return (
    <Dialog>
      <DialogTrigger className="px-2 py-1 rounded text-white bg-green-500 hover:bg-green-600">
        Add Product
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={e => handleSubmit(e)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={e => handleChange(e)} />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={e => handleChange(e)} />
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" name="stock" type="number" value={formData.stock} onChange={e => handleChange(e)} />
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type="submit">
                Save Changes
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}