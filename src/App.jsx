import { useRef, useState } from "react";
import WeatherTypes from "../src/utilities/WeatherTypes.js";

function App() {
  const API_KEY = "5af51bb57b0d33be99a7dc950204ce73";
  const [weatherData, setWeatherData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const fetchWeather = async () => {
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${API_KEY}`;
    setLoading(true);
    await fetch(Url)
      .then((res) => res.json())
      .then((data) => {
        if(data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png"
            },
          ])
        }
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        setWeatherData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-800 flex h-screen items-center justify-center">
      <div className="bg-white rounded-md w-96 p-4">
        <div className="flex items-center justify-between">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter Your Location..."
            className="focus:outline-none font-semibold uppercase text-xl border-b p-1 border-gray-200 flex-1"
          />
          <button onClick={fetchWeather}>
            <img src="../public/images/loupe.png" alt="..." />
          </button>
        </div>
        <div className={`overflow-hidden duration-300 delay-75 ${showWeather ? 'h-[27rem]' : 'h-0'}`}>
        {loading ? (
          <div className="grid place-items-center h-full">
            <img
              src="../public/images/loading.png"
              alt="..."
              className="mt-6 mb-4 mx-auto w-14 animate-spin"
            />
          </div>
        ) : (
          showWeather && (
            <div>
              <div className="text-center flex flex-col gap-6 mt-10">
                {weatherData && (
                  <p className="text-xl font-semibold font-poppins">
                    {weatherData?.name + " , " + weatherData?.sys.country}
                  </p>
                )}
                <img
                  src={showWeather[0]?.img}
                  className="w-52 mx-auto"
                  alt="..."
                />
                <h3 className="text-zinc-800 font-bold text-2xl font-poppins">
                  {showWeather[0]?.type}
                </h3>
                {
                  weatherData && <div className="flex justify-center">
                  <img
                    src="../public/images/hot.png"
                    alt="..."
                    className="h-9 mt-1"
                  />
                  {weatherData && (
                    <h2 className="text-4xl font-extrabold ml-3 font-poppins">
                      {weatherData?.main.temp}&#176; C
                    </h2>
                  )}
                </div>
                }
              </div>
            </div>
          )
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
