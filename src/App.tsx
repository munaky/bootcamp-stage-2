import { useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

import { products as p } from "./data";
interface Product {
  id: number,
  name: string,
  price: number,
  image: string,
  added: boolean,
}

function App() {
  const [products, setProducts] = useState<Product[]>(p);
  const [cartCounter, setCartCounter] = useState<number>(0);

  function addToCart(id: any) {
    setProducts(products.map((v) => {
      if (v.id == id) v.added = true;

      return v;
    }))
    setCartCounter(cartCounter + 1);
  }

  return (
    <>
      <Header cartCounter={cartCounter}></Header>
      <div className="flex gap-2 p-5 justify-center">
        {products.map(v => <ProductCard product={v} addToCart={addToCart} cartCounter={cartCounter} setCartCounter={setCartCounter}></ProductCard>)}
      </div>
    </>
  )
}

export default App
