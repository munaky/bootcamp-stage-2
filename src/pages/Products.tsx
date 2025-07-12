import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Products() {
    return (
        
            <div className="flex gap-2 justify-center bg-gray-100 mt-8">
                {products.map((product) => (<ProductCard key={product.id} product={product} />))}
            </div>
        
    );
}