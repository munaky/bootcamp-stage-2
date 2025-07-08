import { useState, useEffect } from 'react'

function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounceValue;
}

function App() {
  const [productInput, setProductInput] = useState('');
  const [searchList, setsearchList] = useState<[] | null>(null);
  const [errorProductInput, setErrorProductInput] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const [products, setProducts] = useState<[] | null>(null)
  const [productsLimit, setProductsLimit] = useState(10);
  const [productsLoading, setProductsLoading] = useState(false);
  const [errorProducts, setErrorProducts] = useState('');

  const debounceInput = useDebounce(productInput, 500);

  useEffect(() => {
    if (debounceInput && debounceInput.length >= 2) {
      setErrorProductInput('');
      setSearchLoading(true);
      fetch(`https://api.escuelajs.co/api/v1/products/?title=${debounceInput}&limit=5&offset=0`)
        .then(async (r) => {
          const data = await r.json();
          console.log(data)

          if (data.length > 0) {
            setsearchList((data as any).filter((v: any) => v.title.toLowerCase().includes(debounceInput)))
          }
          else {
            setSearchLoading(true);
            setErrorProductInput('Product Not Found!');
            setsearchList(null)
          }
        })
        .finally(() => setSearchLoading(false))
        .catch(() => {
          setSearchLoading(false);
          setErrorProductInput('Something Went Wrong!')
          setsearchList(null)
        });
    }
    else {
      setErrorProductInput('')
      setsearchList(null);
    }
  }, [debounceInput]);

  function setData(title?:any) {
    setErrorProducts('');
    setProductsLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/products/?title=${title || productInput}&limit=${productsLimit}&offset=0`)
      .then(async (r) => {
        const data = await r.json();
        console.log(data)

        if (data.length > 0) {
          setProducts(data)
        }
        else {
          setErrorProducts('Product Not Found!');
          setProducts(null)
        }
      })
      .finally(() => setProductsLoading(false))
      .catch(() => {
        setProductsLoading(false);
        setErrorProducts('Something Went Wrong!')
        setProducts(null)
      });
  }

  function handleListClick(title: any) {
    setProductInput(title)
    setProductsLimit(10)
    setsearchList(null);
    setData(title);
  }

  function handleGet() {
    setsearchList(null);
    setProductsLimit(10)
    setData();
  }

  function handleLoadMore(){
    setProductsLimit(productsLimit + 10)
    setData()
  }

  useEffect(() => setData, []);

  return (
    <div className="flex-row justify-center pt-8 min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <input
            onChange={(e) => setProductInput(e.target.value)}
            value={productInput}
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleGet} className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition">
            Get
          </button>
        </div>

        {/* Dropdown */}
        <div className={"absolute mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg "}>
          <ul className="divide-y divide-gray-100">
            {errorProductInput && (<p className='px-4 py-2 font-medium text-lg text-red-500'>{errorProductInput}</p>)}
            {searchLoading && (<p className='px-4 py-2 font-medium text-lg text-gray-500'>Loading...</p>)}
            {searchList && searchList.map((v: any) => (
              <li key={v.id} onClick={() => handleListClick(v.title)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{v.title}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap items-center justify-center gap-4 px-10 mt-8 pb-10">
        {productsLoading && (
          <div className='w-full'>
            <p className='text-center font-bold text-xl text-gray-500'>Loading...</p>
          </div>
        )}
        {errorProducts && (
          <div className='w-full'>
            <p className='text-center font-bold text-xl text-gray-500'>{errorProducts}</p>
          </div>
        )}

        {products && (
          <>
          {(products as any).map((p: any) => (
          <div key={p.id} className="flex-col max-w-[200px] bg-white rounded-2xl shadow-md overflow-hidden flex gap-4 p-4 items-center">
            <img
              src={p.images[0]}
              alt={p.title}
              className="w-full h-auto object-cover rounded-xl"
            />
            <div className="grow flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{p.title}</h3>
              <p className="text-yellow-600 font-bold pt-1">Rp{(p.price * 16000).toLocaleString('id-ID')}</p>
            </div>
          </div>
        ))}
          {(products.length > 1) && (
            <div className="w-full flex justify-center">
            <button onClick={handleLoadMore} className='py-2 px-3 text-xl font-bold rounded-lg text-white bg-green-500 hover:bg-green-600'>Load More</button>
          </div>
          )}
          </>

        )}
      </div>
    </div>
  )
}

export default App
