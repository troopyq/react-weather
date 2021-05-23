import axios from "axios";
import { useEffect, useState } from "react";

import './scss/App.scss'



function App() {
  
  const [city, setCity] = useState('Not found');
  const [temperature, setTemperature] = useState(0)
  const [inpCity, setInpCity] = useState('')
  const [position, setPosition] = useState({})
  

  function toCelcius(temp) {
    if (!temp || typeof temp !== 'number') return 0
    return Math.round(temp - 273.15);
  }

  function getGeolocation() {
    let geo = {}
     navigator.geolocation.getCurrentPosition(pos => {
      const crd = pos.coords
      const posit = {
        lat: crd.latitude,
        lon: crd.longitude
      }
      setPosition(posit)
      geo = posit
      console.log('position success');
      console.log(posit);
      return posit

    }, (err) => {
      console.log('position error');
      console.log(err);
      setPosition({})
    }, { 
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })

    return geo
  }

  function onChangeCity(e) {
    setInpCity(e.target.value)
  }

  async function getWeather() {
    const pos = getGeolocation()
    console.log(pos);
    const options = {
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      params: {
        appid: 'a482831921ae4546e7f36c4415ede7b8',
        lang: 'ru',
        temp: 'Celsius',
        
      }
    };
    console.log('inpCity', inpCity);
    console.log('pos', pos);
    if (inpCity){
      options.params.q = inpCity
    } else if(position){
      options.params.lon = position.lon
      options.params.lat = position.lat
    } else{
      options.params.q = 'Moscow'
    }

    axios.request(options).then(res => {
      console.log(res.data);
      let temp = res.data.list[0].main.temp
      if (inpCity) {
        setCity(inpCity)
      } else {
        setCity(res.data.city.name)
      }
      setTemperature(toCelcius(temp))
    }).catch(error => {
      console.error('error');
      console.error(error);
      setCity('Not Found')
      setTemperature(0)
    });
  }

  useEffect(() => {
    getWeather()
  }, [inpCity])



  return (
    <div className="wrapper">
      <div className="window">
        <input value={inpCity}
         onChange={onChangeCity}
          placeholder='ГОРОД'
           type="text"
            className="input__city" />
        <div className="city">
          {city}
        </div>
        <div className="temperature">
          {temperature}
        </div>
      </div>
    </div>
  )
}

export default App
