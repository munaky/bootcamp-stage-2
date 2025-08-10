import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import adminAPI from "../../api/admin";

export default function CreateProductDialog({ setProducts }: { setProducts: any }) {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    price: '0',
    stock: '0',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "price" || name === "stock" ? Number(value) : value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("stock", formData.stock);
    if (imageFile) {
      payload.append("image", imageFile);
    }

    adminAPI
      .post("/products/create", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(async (r) => {
        const res = await r.data;
        const data = res.data;

        if (res.status === "success") {
          setProducts((prev: any) => [...prev, data]);
          addToast({ type: "success", title: "Created!", description: "Product Created.", duration: 1000 });
        }
      })
      .catch((err) => {
        console.error(err);
        addToast({ type: "error", title: "Error!", description: "Failed to create product." });
      });
  };

  return (
    <Dialog>
      <DialogTrigger className="px-2 py-1 rounded text-white bg-green-500 hover:bg-green-600">
        Add Product
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="text" value={formData.price} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" name="stock" type="text" value={formData.stock} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="image">Image</Label>
            <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Create
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
