import { memo, useEffect } from "react"
import { toCelcius } from "../func";
import { City, Temperature} from "../index";

const Weather = memo(({city, temperature, weather, forecast}) => {
  function getIcon(data) {
    const hours = new Date(data.dt).getHours()
    let path = 'img/weather_icons/animated/'

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

  useEffect(() => {

  forecast = forecast.map(el => {
    const obj = {}
    console.log(el);
    obj.dt_txt = el.dt_txt.match(/\d\d:\d\d/)[0]
    obj.temp = toCelcius(el.main.temp)
    obj.weather = el.weather
  })    
  }, [forecast])

  console.log(forecast);

  return (
    <>
      <City city={city} />
        <Temperature temp={temperature} />
        {Object.keys(weather).length > 1 ? 
        (<div className="weath">
          <div className="icon">
            <img src={getIcon(weather)} alt="nope" />
          </div>
          <div className="description">
            {weather.description}
          </div>
        </div>) : ''}
    </>
  )
})

export default Weather
