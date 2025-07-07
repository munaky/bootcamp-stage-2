type Product = {
    id: number,
    name: string,
    price: number,
    image: string,
    added: boolean,
};

const ProductCard = ({ product, addToCart }: { product: Product, addToCart: any, cartCounter: any, setCartCounter: any }) => {


    return (
        <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className={"absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md z-10 shadow " +
                (product.added ? 'visible' : 'hidden')}>
                Added
            </div>

            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">Rp.{product.price}</p>
                <button onClick={() => addToCart(product.id)} className="mt-2 bg-blue-600 text-white text-sm py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
