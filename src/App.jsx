import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import reducer from './reducer'

import AnimatedNumber from "react-animated-numbers"

import './scss/App.scss'



function App() {

  const [state, dispatch] = useReducer(reducer, {
    city: '',
    temperature: 0,
    inpCity: '',
    position: {},
    isLoading: {},
    weather: {
    }
  })

  function getIcon(data) {
    const hours = new Date(data.dt).getHours()
    let path = './img/weather_icons/animated/'

    if (hours < 20 && hours >= 6) {
      switch (data.main) {
        case 'Thunderstorm':
          return path + 'thunder.svg'
      
        case 'Drizzle':
          return path + 'rainy-4.svg'
      
        case 'Rain':
          return path + 'rainy-6.svg'
      
        case 'Snow':
          return path + 'snowy-5.svg'
      
        case 'Clear':
          return path + 'day.svg'
      
        case 'Clouds':
          return path + 'cloudy.svg'
      
        default:
          return ''
      }
    } else{
      switch (data.main) {
        case 'Thunderstorm':
          return path + 'thunder.svg'
      
        case 'Drizzle':
          return path + 'rainy-4.svg'
      
        case 'Rain':
          return path + 'rainy-6.svg'
      
        case 'Snow':
          return path + 'snowy-5.svg'
      
        case 'Clear':
          return path + 'night.svg'
      
        case 'Clouds':
          return path + 'cloudy-night-3.svg'
      
        default:
          return ''
      }
    }

    
    
  }
  

  function toCelcius(temp) {
    if (!temp || typeof temp !== 'number') return 0
    return Math.round(temp - 273.15);
  }

  function getGeolocation() {

     navigator.geolocation.getCurrentPosition(pos => {
       console.log(pos);
      const crd = pos.coords
      let geo = {
        lat: crd.latitude,
        lon: crd.longitude
      }
      dispatch({
        type: 'SET_POSITION',
        payload: geo
      })
      // setPosition(geo)
      console.log(state.position);
      console.log('position success');

      getWeather(geo)


    }, (err) => {
      console.log('position error');
      console.log(err);
      dispatch({
        type: 'SET_POSITION',
        payload: {}
      })
      // setPosition({})
    }, { 
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 5000
    })

  }

  function onChangeCity(e) {
    // setInpCity(e.target.value)
    dispatch({
      type: 'SET_INPUT_CITY',
      payload: e.target.value
    })
    
  }

  async function getWeather(location = {}) {
    const options = {
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      params: {
        appid: 'a482831921ae4546e7f36c4415ede7b8',
        lang: 'ru',
        temp: 'Celsius',
        
      }
    };

    if (state.inpCity){
      options.params.q = state.inpCity
    } else if(state.position.lon){
      options.params.lon = state.position.lon
      options.params.lat = state.position.lat

    } else if(location.lon){
      options.params.lon = location.lon
      options.params.lat = location.lat
    } else{
      options.params.q = 'Moscow'
    }

    axios.request(options).then(res => {
      console.log(res.data);
      let dt = res.data.list[0].dt
      let weather = res.data.list[0].weather[0]
      let temp = res.data.list[0].main.temp

      weather.dt = dt

      if (state.inpCity) {

        dispatch({
          type: 'SET_CITY',
          payload: state.inpCity
        })
        
      } else {

        dispatch({
          type: 'SET_CITY',
          payload: res.data.city.name
        })
      }

      dispatch({
        type: 'SET_WEATHER',
        payload: weather
      })

      dispatch({
        type: 'SET_TEMPERATURE',
        payload: toCelcius(temp)
      })

    }).catch(error => {
      console.error('error');
      
      // dispatch({
      //   type: 'SET_CITY',
      //   payload: 'Not Found'
      // })

      
    });
  }



  useEffect(() => {
    getGeolocation()
    // getWeather()
  }, [state.inpCity])

  return (
    <div className="wrapper">
      <div className="window">
        <input value={state.inpCity}
         onChange={onChangeCity}
          placeholder='ГОРОД'
           type="text"
            className="input__city" />
        <div className="city">
          {state.city}
        </div>
        <div className="temperature">
          <AnimatedNumber
            animateToNumber={state.temperature}
            animationType={"random"}
          />
        </div>
        {Object.keys(state.weather).length > 1 ? 
        (<div className="weath">
          <div className="icon">
            <img src={getIcon(state.weather)} alt="" />
          </div>
          <div className="description">
            {state.weather.description}
          </div>
        </div>) : ''}
        
        
      </div>

    </div>
  )
}

export default App
