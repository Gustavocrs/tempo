import { GoLocation } from 'react-icons/go'
import './Location.css'

export default function Location (){
  return(
    <div className="card">
    <GoLocation className="icon" />
    <h1>Sua localização precisa estar habilitada</h1>
  </div>
  )
}