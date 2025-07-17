import { useState } from "react";
import { type Product } from "../../types/product";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useCart } from "../../hooks/useCart";
import { Minus, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import userAPI from "../../api/user";
import adminAPI from "../../api/admin";
import { useToast } from "../../hooks/useToast";

export default function ProductCard({ product, products, setProducts }: { product: Product, products: Product[], setProducts: any }) {
    const { addToast } = useToast();

    const handleDelete = () => {
        adminAPI.delete(`/products/delete/${product.id}`)
            .then(async (r) => {
                const res = await r.data;

                console.log(res);

                addToast({ type: 'success', title: 'Deleted!', description: 'Product deleted.', duration: 1000 });

                setProducts((prev: any) => prev.filter((p: Product) => p.id != product.id));
            })
            .catch((e) => {
                console.log(e)
                addToast({ type: 'error', title: 'Error!', description: 'Failed to delete product.' });
            });
    }

    const handleDisable = () => {
        adminAPI.patch(`/products/disable/${product.id}`)
            .then(async (r) => {
                const res = await r.data;

                console.log(res);

                addToast({ type: 'success', title: 'Disabled!', description: 'Product disabled.', duration: 1000 });

                let newProducts: Product[] = products.map((p) => {
                    const n = p;
                    if(p.id === product.id) n.deleteAt = Date.now();
                    
                    return n
                });
                setProducts(newProducts);

            })
            .catch((e) => {
                console.log(e)
                addToast({ type: 'error', title: 'Error!', description: 'Failed to disable product.' });
            });
    }

    const handleEnable = () => {
        adminAPI.patch(`/products/enable/${product.id}`)
            .then(async (r) => {
                const res = await r.data;

                console.log(res);

                addToast({ type: 'success', title: 'Enabled!', description: 'Product enabled.', duration: 1000 });

                let newProducts: Product[] = products.map((p) => {
                    const n = p;
                    if(p.id === product.id) n.deleteAt = null;
                    
                    return n
                });
                setProducts(newProducts);
            })
            .catch((e) => {
                console.log(e)
                addToast({ type: 'error', title: 'Error!', description: 'Failed to enable product.' });
            });
    }

    const stockStatus = product.stock > 10
        ? "In Stock"
        : product.stock > 0
            ? `Only ${product.stock} left!`
            : "Out of Stock";

    const stockColor = product.stock === 0
        ? "bg-red-100 text-red-600"
        : product.stock < 10
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-700";

    return (
        <Dialog>
            <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-200">
                {product.deleteAt && (
                    <div className="absolute top-2 right-2 text-xs font-semibold bg-red-500 text-white px-2 py-1 rounded shadow">
                        Disabled
                    </div>
                )}
                <img
                    src={'http://localhost:3000/images/' + product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-4 space-y-2">
                    <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-blue-600 font-semibold">Rp{product.price.toLocaleString("id-ID")}</p>
                        <Badge className={`${stockColor} text-xs font-medium`}>
                            {stockStatus}
                        </Badge>
                    </div>
                    <DialogTrigger
                        disabled={product.stock === 0}
                        className="w-full mt-2 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        View Details
                    </DialogTrigger>
                </div>
            </div>

            <DialogContent className="w-full max-w-[90vw] sm:max-w-lg max-h-[90vh] overflow-y-auto p-4 rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold text-gray-800 mb-4">
                        {product.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center space-y-4">
                    <img
                        src={'http://localhost:3000/images/' + product.image}
                        alt={product.name}
                        className="w-64 h-64 rounded-lg object-cover"
                    />
                    <p className="text-gray-600 text-center">{product.description}</p>
                    <p className="text-lg font-semibold text-blue-600">
                        Rp{product.price.toLocaleString("id-ID")}
                    </p>

                    <Badge className={`${stockColor} text-sm`}>
                        {stockStatus}
                    </Badge>

                    <div className="w-full flex justify-between gap-2">
                        <DialogTrigger className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                            Edit
                        </DialogTrigger>
                        {product.deleteAt != null ?
                            (
                                <DialogTrigger
                                    onClick={handleEnable}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                                >
                                    Enable
                                </DialogTrigger>
                            )
                            :
                            (
                                <DialogTrigger
                                    onClick={handleDisable}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md"
                                >
                                    Disable
                                </DialogTrigger>
                            )}
                        <DialogTrigger
                            onClick={handleDelete}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md"
                        >
                            Delete
                        </DialogTrigger>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
