import { products } from "../data/products";

export default function Home() {
    return (
        <div className="flex flex-col px-[100px] md:flex-row gap-6 p-8">
            {/* Kolom Kiri: Fitur */}
            <div className="md:w-1/2 space-y-4">
                <h2 className="text-2xl font-bold">Kenapa Belanja di TokoKami?</h2>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
                    <li>Pengiriman cepat & aman</li>
                    <li>Metode pembayaran lengkap</li>
                    <li>Produk berkualitas tinggi</li>
                    <li>Customer service responsif</li>
                </ul>
            </div>

            {/* Kolom Kanan: Produk */}
            <div className="md:w-1/2 flex flex-wrap gap-4">
                {products.map((product, i) => {
                    if (i > 3) return;
                    return (
                        <div
                            key={product.id}
                            className="w-[calc(50%-0.5rem)] border rounded-2xl shadow p-4 hover:shadow-lg transition"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-32 object-cover rounded-xl mb-3"
                            />
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}