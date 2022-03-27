import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: "debb98d2ccf2eed3b85b93a8c4d380bd",
        lang: "pt",
        units: "metric",
      },
    });
    setWeather(res.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (location === false) {
    return <>Sua localização precisa estar habilitada</>;
  } else if (weather === false) {
    return <>Carregando...</>;
  } else {
    return (
      <>
        <h3>Localização estimada: "{weather["name"]}"</h3>
        <hr />
        <ul>
          <li>Visão do tempo: {weather["weather"][0]["description"]} </li>
          <li>Temperatura atual: {weather["main"]["temp"]}º</li>
          <li>Sensação térmica: {weather["main"]["feels_like"]}º</li>
          <li>Temperatura máxima: {weather["main"]["temp_max"]}º</li>
          <li>Temperatura mínima: {weather["main"]["temp_min"]}º</li>
          <li>Pressão: {weather["main"]["pressure"]}hpa</li>
          <li>Umidade: {weather["main"]["humidity"]}%</li>
          <li>Ventos: {weather["wind"]["speed"]}km/h</li>
        </ul>
      </>
    );
  }
}

export default App;
