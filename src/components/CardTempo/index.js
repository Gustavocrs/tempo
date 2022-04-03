import './CardTempo.css'
import {
  WiThermometerExterior,
  WiThermometer,
  WiHumidity,
  WiStrongWind,
} from 'react-icons/wi'

export default function CardTempo(props) {
  return (
    <section>
      <div className="card">
        <h1>Localização estimada:</h1>
        <p className="infos">{props.clima['name']}</p>
        <div className="lista">
          <div>
            <p className="principal">
              {props.clima['main']['temp'].toFixed(1)}º
            </p>
            <p className="infos">
              Sensação térmica: {props.clima['main']['feels_like'].toFixed(1)}º
            </p>
          </div>
          <div className="divList">
            <div className="divIcons">
              <WiThermometerExterior className="icon" />
              <p className="iconDesc"></p>
              <p className="miniDesc">Mínima</p>
              {props.clima['main']['temp_min'].toFixed(1)}º
            </div>
            <div className="divIcons">
              <WiThermometer className="icon" />
              <p className="miniDesc">Máxima</p>
              <p className="iconDesc"></p>
              {props.clima['main']['temp_max'].toFixed(1)}º
            </div>
            <div className="divIcons">
              <WiHumidity className="icon" />
              <p className="iconDesc"></p>
              <p className="miniDesc">Umidade</p>
              {props.clima['main']['humidity'].toFixed(0)}%
            </div>
            <div className="divIcons">
              <WiStrongWind className="icon" />
              <p className="iconDesc"></p>
              <p className="miniDesc">Ventos</p>
              {props.clima['wind']['speed'].toFixed(1)}km/h
            </div>
          </div>
          <p>Fonte: OpenWeather</p>
          <p>https://openclimamap.org/</p>
        </div>
      </div>
    </section>
  )
}
