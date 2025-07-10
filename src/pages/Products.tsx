import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { getProducts } from "../api/product";

export default function Products() {
    const [selectedCatalog, setSelectedCatalog] = useState<'furniture' | 'shoes' | 'miscellaneous' | 'testing-category' | ''>('');
    const [products, setProducts] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getProducts.get("/api/v1/products", {
            params: {
                categorySlug: selectedCatalog,
                limit: 10,
                offset: 0
            },
        })
            .then(r => {
                const data = r.data
                console.log(products)
                setProducts(data)
            })
            .finally(() => setLoading(false))
            .catch((err) => {
                console.error("Failed to fetchs data!", err);
                setLoading(false)
            });

    }, [selectedCatalog])
    return (
        <>
            <div className="flex justify-center gap-2 mb-4">
                <Button onClick={() => setSelectedCatalog('furniture')} variant={'outline'}>
                    Furniture
                </Button>
                <Button onClick={() => setSelectedCatalog('shoes')} variant={'outline'}>
                    Shoes
                </Button>
                <Button onClick={() => setSelectedCatalog('miscellaneous')} variant={'outline'}>
                    Miscellaneous
                </Button>
                <Button onClick={() => setSelectedCatalog('testing-category')} variant={'outline'}>
                    Testing
                </Button>
            </div>

            {loading && (<p className="mb-4 text-center text-xl font-bold text-gray-700">Loading ...</p>)}

            {products && (
                <div className="grid justify-items-center grid-cols-2 md:grid-cols-4 gap-4 px-10">
                {products.map((product: any) => (
                    <ProductCard product={product}/>
                ))}
            </div>
            )}
        </>

    );
}