import React, { useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import MapIcon from '../utils/mapIcon'
import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import {LeafletMouseEvent} from 'leaflet'



export default function CreateOrphanage() {
  const [name, setName]= useState('')
  const [about, setAbout]= useState('')
  const [instructions, setInstructions]= useState('')
  const [opening_hours, setOpeningHours]= useState('')


  const { goBack } = useHistory();

  const [position, setPosition] = useState({latitude: 0, longitude:0})

  function handleManpClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }

  function handleSubmit(){

  }


  return (

    <div id="page-create-orphanage">
      <Sidebar/>
      <main>
        <form on className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleManpClick}
            >
              <TileLayer
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />

              {position.latitude != 0 &&
               (<Marker
                interactive={false}
                icon={MapIcon}
                position={[position.latitude,position.longitude]}/>)}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className="active">Sim</button>
                <button type="button">Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
