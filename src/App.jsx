import { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/Weather';

const App = ()=> {
  const [lat, setLat] = useState([]); //Latitude
  const [long, setLong] = useState([]); //Longitude
  const [data, setData] = useState([]); //Weather data
  let componentMounted = true;

  const fetchData = async () => {
    // First get the user location
    navigator.geolocation.getCurrentPosition(function (position){
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log(lat);
      console.log(long);
    })
    // Fetch API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=91408ff15585d53cc8fe4ea1c384fb84`);
    if(componentMounted){
      setData(await response.json());
      console.log(data);
    }
    return() => {
      componentMounted = false;
    }
  }

  useEffect(() => {
    fetchData();
  }, [lat, long]);

  return (
    <>
    {(typeof data.main != 'undefined') ? (
      <Weather weatherData={data}/>
    ) : (
      <div>....Loading</div>
    )
    }
    </>
  );
}

export default App
