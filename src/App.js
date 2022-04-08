import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Location from './components/Location/'
import Loading from './components/Loading/'
import CardTempo from './components/CardTempo'

import './App.css'

export default function App() {
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
   const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
    navigator.geolocation.watchPosition(
      (position) => {
        getWeather(position.coords.latitude, position.coords.longitude)
        setLocation(true)
      console.log(position)},
      (error) => console.log(error),
      options
    )
  }, [])

  if (location === false) {
    return <Location />
  } else if (weather === false) {
    return <Loading />
  } else {
    return <CardTempo clima={weather} />
  }
}
