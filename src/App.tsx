import { useState, useEffect } from 'react'
import { locations } from './locations';

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
  const [locationInput, setLocationInput] = useState('');
  const [showedLocation, setShowedLocation] = useState([]);
  const [weatherData, setWeatherData] = useState<{
    location: string;
    temperature: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const deboundLocation = useDebounce(locationInput, 500);

  useEffect(() => {
    if (deboundLocation && deboundLocation.length >= 2) {
      /* setLoading(true); */
      setShowedLocation((locations as any).filter((v: any) => v.location.toLowerCase().includes(deboundLocation)))
      /* fetch(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${locationCode}`)
        .then(r => {
          const data = r.json()
          console.log(data);
        })
        .finally(() => setLoading(false)) */
    }
    else {
      setShowedLocation([]);
    }
  }, [deboundLocation]);

  function showTemp(code: any) {
    setLoading(true);
    setWeatherData(null)
    fetch(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${code}`)
      .then(async (r) => {
        const data = await r.json()
        console.log(data);
        setWeatherData({
          location: (data.lokasi.desa) || null,
          temperature: (data.data[0].cuaca[0][0].t) || null
        })
      })
      .finally(() => setLoading(false));
  }

  function showedLocationOnClick(data: any) {
    setLocationInput(data.location)
    setShowedLocation([]);
    showTemp(data.code)
  }

  function handleGet(){
      const data = (locations as any).filter((v: any) => v.location.toLowerCase().includes(deboundLocation))[0]
      if(data){
        setLocationInput(data.location)
        showTemp(data.code);
      }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <div className="relative w-full max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <input
              onChange={(e) => setLocationInput(e.target.value)}
              value={locationInput}
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleGet} className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition">
              Get
            </button>
          </div>

          {/* Dropdown */}
          <div className={"absolute mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg " + (showedLocation.length == 0 && 'hidden')}>
            <ul className="divide-y divide-gray-100">
              {showedLocation.map((v: any) => (
                <li key={v.code} onClick={() => showedLocationOnClick(v)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{v.location}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Temp */}
        {loading &&  (<p className="text-lg text-gray-600 mt-1">Loading...</p>)}
        {weatherData && (
          <div className="w-full max-w-md mx-auto mt-6 p-4 bg-white rounded-2xl shadow-md text-center">
            <p className="text-lg text-gray-600 mt-1">{weatherData.location}</p>

            <div className="mt-4">
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="text-2xl font-bold text-blue-600">{weatherData.temperature}°C</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
