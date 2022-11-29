

import axios from "axios"
import './App.css'
import {useState,useEffect} from "react";
import Degrees from "./img/Degrees";
function App() {
 const [coords, setCoords] = useState()
const [weather, setWeather] = useState()                       
const [changeBack, setChangeBack] = useState("clearSky")
const [temperature, setTemperature] = useState()





useEffect(() => {
const success=pos =>{
  const lat=pos.coords.latitude
  const long=pos.coords.longitude
  setCoords({lat,long})
}
navigator.geolocation.getCurrentPosition(success)

}, [])

console.log(weather);

useEffect(() => {
 if (coords !== undefined) {
 const API_KEY ="92a83b30197e1f3a8e682d3be69f03c4"
 const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${API_KEY}&units=metric`
 axios.get(URL)
//         .then(res => setWeather(res.data))
//         .catch(err =>console.log(err))
//                } 
// }, [coords])
.then(res => {
  const celsius =  (res.data.main.temp ).toFixed(1)
  const farenheit =   (celsius * 9/5 + 3).toFixed(1)
  setTemperature({celsius, farenheit})

  setWeather(res.data)}) // then y catch reciben como parametros un callback, en el then guarda res.data dentro del state weather a traves de setWeather
.catch(err => console.log(err))
}
}, [coords])
useEffect(() => {
  if (weather?.weather[0].main.includes("Clear")) {
 setChangeBack("clearSky")   
  }else if (weather?.weather[0].main.includes("Thunderstorm")) {
    setChangeBack("thunderstorm")      
  }
  else if(weather?.weather[0].main.includes("Drizzle")) {
    setChangeBack("drizzle")      
  }
  else if(weather?.weather[0].main.includes("Rain")) {
    setChangeBack("rain")      
  }
  else if(weather?.weather[0].main.includes("	broken clouds")) {
    setChangeBack("	broken clouds")      
  }
}, [])





 return (
    <div className={`${changeBack} backgd`}>
     
      
      <div className="card">
        <header className="card__header">
        <h1 className="card__title">weather</h1>
        <h2 className="card__subtitle">
          {weather?.name},{weather?.sys.country}
        </h2>
        </header>
        <section className="card__icon-container">
          <img className="card__icon"src={weather &&`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}alt=""/>
          {/* <h4>{weather?.main.temp} C°</h4> */}
        </section>
        <section className="card__info">
         <h3 className="card__temp">{weather?.weather[0].description}</h3>
         <ul className="card__list">
            <li className="card_item"><span className="card__span">Wind Speed</span>{weather?.wind.speed}m/s</li>
            <li className="card_item"><span className="card__span">Clouds</span>{weather?.clouds.all}%</li>
            <li className="card_item"><span className="card__span">Pressure</span>{weather?.main.pressure}hPa</li>
         </ul>
         </section>
         <footer className="card__footer">
         {/* <button className="card__button">degrees °F/°C</button> */}
         <Degrees temperature={temperature} />
         </footer>
        
      </div>
    </div>
  )
}

export default App
