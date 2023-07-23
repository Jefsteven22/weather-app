import axios from "axios"
import { useState, useEffect } from "react"
import Loading from './Loading'


const Weather = () => {

  const [data, setData] = useState({})
  const [metric, setMetric] = useState(true)
  const tempToCelcius = Math.round(data.main?.temp - 273.15)
  const [isLoading, setIsLoading] = useState(true)

  const icons = {

    "01d": "/img/01d.svg",
    "02d": "/img/02d.svg",
    "03d": "/img/03d.svg",
    "04d": "/img/04d.svg",
    "09d": "/img/09d.svg",
    "10d": "/img/10d.svg",
    "11d": "/img/11d.svg",
    "13d": "/img/13d.svg",
    "50d": "/img/50d.svg",
    "01n": "/img/01n.svg",
    "02n": "/img/02n.svg",
    "03n": "/img/03n.svg",
    "04n": "/img/04n.svg",
    "09n": "/img/09n.svg",
    "10n": "/img/10n.svg",
    "11n": "/img/11n.svg",
    "13n": "/img/13n.svg",
    "50n": "/img/50n.svg"

  }

  useEffect( () => {
    
    navigator.geolocation.getCurrentPosition((position) => {

      setIsLoading(true)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=f435644d8da0a624ff654c495d94ea50`)
        .then( resp => setData(resp.data))
        .catch( error => console.error(error))
        .finally( () => setIsLoading(false))
    })
    
  }, [])

  
  return(
    <>
      {
        isLoading 
          ? (<Loading />)
          : (<section className="weather__wrapper">
          <h1 className="title">Weather app</h1>
          <div className="container__weather">
            <div className="header">
              <p>{metric ? `${tempToCelcius} °C` : `${Math.round(tempToCelcius * 9/5 + 32)} °F`}</p>
              <img className="icon" src={icons[data.weather?.[0].icon]} alt="Iconos del tiempo" />
            </div>
            <div className="main">
              <div className="info">
                <p>VIENTO: {data.wind?.speed} m/s</p>
                <p>NUBES: {data.clouds?.all}%</p>
                <p>PRESION: {data.main?.pressure} hPa</p>
              </div>
            </div>
            <div className="footer">
              <p>{data.name}, {data.sys?.country}</p>
              <p className="description">{data.weather?.[0].description}</p>
            </div>
          </div>
          <div className="button">
            <button className="changeTemp" onClick={() => setMetric(!metric)}>{metric ? 'Cambiar a °F' : 'Cambiar a °C'}</button>
          </div>
        </section>)
      }
    </>
  )
}

export default Weather