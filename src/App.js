import React from 'react'
import axios from 'axios'

import { useEffect, useState } from 'react'

import './App.css'

import { GoLocation } from 'react-icons/go'
import {
  WiThermometerExterior,
  WiThermometer,
  WiHumidity,
  WiStrongWind,
} from 'react-icons/wi'

function App() {
  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState(false)

  let getWeather = async (lat, long) => {
    let res = await axios('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: long,
        appid: 'debb98d2ccf2eed3b85b93a8c4d380bd',
        lang: 'pt',
        units: 'metric',
      },
    })
    setWeather(res.data)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude)
      setLocation(true)
    })
  }, [])

  if (location === false) {
    return (
      <div className="card">
        <GoLocation className="icon" />
        <h1>Sua localização precisa estar habilitada</h1>
      </div>
    )
  } else if (weather === false) {
    return (
      <div className="card">
        <div className="ldsEllipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  } else {
    return (
      <section>
        <div className="card">
          <h1>Localização estimada:</h1>
          <p className="infos">{weather['name']}</p>
          <div className="lista">
            <div>
              <p className="principal">{weather['main']['temp'].toFixed(1)}º</p>
              <p className="infos">
                Sensação térmica: {weather['main']['feels_like'].toFixed(1)}º
              </p>
            </div>
            <div className="divList">
              <div className="divIcons">
                <WiThermometerExterior className="icon" />
                <p className="iconDesc">
                  <p className="miniDesc">Minima</p>
                  {weather['main']['temp_min'].toFixed(1)}º
                </p>
              </div>
              <div className="divIcons">
                <WiThermometer className="icon" />
                <p className="miniDesc">Máxima</p>
                <p className="iconDesc">
                  {weather['main']['temp_max'].toFixed(1)}º
                </p>
              </div>
              <div className="divIcons">
                <WiHumidity className="icon" />
                <p className="iconDesc">
                  <p className="miniDesc">Umidade</p>
                  {weather['main']['humidity'].toFixed(0)}%
                </p>
              </div>
              <div className="divIcons">
                <WiStrongWind className="icon" />
                <p className="iconDesc">
                  <p className="miniDesc">Ventos</p>
                  {weather['wind']['speed'].toFixed(1)}km/h
                </p>
              </div>
            </div>
            {/* <li>Pressão: {weather['main']['pressure']}hpa</li> */}
            {/* <p className='secundario'>{weather['weather'][0]['description']}</p> */}
            <p>Fonte: OpenWeather</p>
            <p>https://openweathermap.org/</p>
          </div>
        </div>
      </section>
    )
  }
}

export default App
