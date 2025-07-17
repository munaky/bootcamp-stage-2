import { useState, useEffect } from "react";
import ProductCard from "../../components/user/ProductCard";
import { products as rawProducts } from "../../data/products";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { type Product } from "../../types/product";
import userAPI from "../../api/user";
import { Button } from "../../components/ui/button";
import { objectToQuery } from "../../lib/etc";
import { useToast } from "../../hooks/useToast";
import { Search } from "lucide-react";

export default function Products() {
    const limit = 5;
    const [sortFilter, setSortFilter] = useState<object>({ orderBy: 'name', order: 'asc' });
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const { addToast } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');

    useEffect(() => {
        userAPI.get(`/products/?${query()}`)
            .then(async (r) => {
                const res = await r.data;

                console.log(res);

                setProducts(res.data);
            })
            .catch((e) => {
                console.log(e)
                addToast({ type: 'error', title: 'Error!', description: 'Failed to fetch products.' });
            });
    }, []);

    const query = (p?: number) => {
        return objectToQuery({
            page: p || page,
            limit,
            ...(search ? { search } : {}),
            ...(minPrice ? { minPrice } : {}),
            ...(maxPrice ? { maxPrice } : {}),
            ...sortFilter,
        });
    }

    const handleFilter = () => {
        setPage(1);
        console.log(query())
        userAPI.get(`/products/?${query(1)}`)
            .then(async (r) => {
                const res = await r.data;

                console.log(res);

                setProducts(res.data);
            })
            .catch((e) => {
                console.log(e)
                addToast({ type: 'error', title: 'Error!', description: 'Failed to fetch products.' });
            });
    }

    const handleLoadMore = (nextPage: number) => {
        setPage(nextPage);
        userAPI.get(`/products/?${query(nextPage)}`)
            .then(async (r) => {
                const res = await r.data;

                console.log('this')
                console.log(res);
                console.log('/this')

                setProducts(prev => [...prev, ...res.data]);
            })
            .catch((e) => {
                console.log(e)
                addToast({ type: 'error', title: 'Error!', description: 'Failed to fetch products.' });
            });
    }

    return (
        <section className="bg-gray-50 py-12 px-4 sm:px-8 lg:px-16 space-y-10">
            <h1 className="text-3xl font-bold text-center text-gray-800">List Products</h1>

            <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-4 md:col-span-1 bg-white rounded-xl p-4 border shadow-sm">
                    <div className="flex-1 max-w-md hidden md:flex items-center gap-2" >
                        <div className="relative w-full">
                            <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
                            <Input
                                placeholder="Search products..."
                                value={search}
                                className="pl-8"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div >
                    <div className="space-y-2">
                        <Label>Min Price</Label>
                        <Input
                            type="number"
                            value={minPrice}
                            onChange={(e: any) => setMinPrice(e.target.value)}
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Max Price</Label>
                        <Input
                            type="number"
                            value={maxPrice}
                            onChange={(e: any) => setMaxPrice(e.target.value)}
                            placeholder="999999"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Sort by</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    onClick={() => setSortFilter({ orderBy: 'name', order: 'asc' })}
                                    value="name-asc">Name (A-Z)</SelectItem>
                                <SelectItem
                                    onClick={() => setSortFilter({ orderBy: 'name', order: 'desc' })}
                                    value="name-desc">Name (Z-A)</SelectItem>
                                <SelectItem
                                    onClick={() => setSortFilter({ orderBy: 'price', order: 'asc' })}
                                    value="price-asc">Price (Low → High)</SelectItem>
                                <SelectItem
                                    onClick={() => setSortFilter({ orderBy: 'price', order: 'desc' })}
                                    value="price-desc">Price (High → Low)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleFilter} className="mt-2 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold text-sm disabled:bg-gray-400 disabled:cursor-not-allowed">Filter</Button>
                </div>

                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-600">No products found.</p>
                    )}
                    {((products.length > 0) && (products.length % limit === 0)) && (
                        <div className="self-center">
                            <button onClick={() => handleLoadMore(page + 1)} className="rounded-lg font-semibold px-3 py-2 text-white bg-blue-500 hover:bg-blue-500">Load More</button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
