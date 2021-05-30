import { useEffect, useReducer} from "react";
import axios from "axios";
import reducer from './reducer'

import './scss/App.scss'

import { Weather } from "./components";
import { toCelcius } from "./components/func";



function App() {

  const [state, dispatch] = useReducer(reducer, {
    city: '',
    temperature: 0,
    inpCity: '',
    position: {},
    isLoading: {},
    weather: {},
    forecast: []
  })

 


  function getGeolocation() {
    console.log('check geo');
    if ("geolocation" in navigator){
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
       getWeather()
       // setPosition({})
     }, { 
       enableHighAccuracy: true,
       timeout: 50000,
       maximumAge: 5000
     })
    } else {
      console.log('geo false');
      getWeather()
    }

     

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
      // console.log(res.data);
      let dt = res.data.list[0].dt
      let forecast = res.data.list.slice(0,10)
      // console.log(forecast);
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
        type: 'SET_FORECAST',
        payload: forecast
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


/* 
  FIXME: Constantly requests geolocation
*/

  useEffect(() => {
    getGeolocation()
  }, [])

  useEffect(() => {
    getWeather(state.position)
  }, [state.inpCity])


  return (
    <div className="wrapper">
      <div className="window">
        <input value={state.inpCity}
          onChange={onChangeCity}
          placeholder='ГОРОД'
          type="text"
          className="input__city"
        />
        
        <Weather city={state.city} temperature={state.temperature} weather={state.weather} forecast={state.forecast} />
        
        
      </div>

    </div>
  )
}

export default App
