import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import MapIcon from '../utils/mapIcon'
import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import {LeafletMouseEvent} from 'leaflet'
import api from "../services/api";



export default function CreateOrphanage() {
  const history = useHistory()

  const [name, setName]= useState('')
  const [about, setAbout]= useState('')
  const [instructions, setInstructions]= useState('')
  const [opening_hours, setOpeningHours]= useState('')
  const [open_on_weekends, setOpenOnWeekends ] = useState(true)
  const[images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>()


  const { goBack } = useHistory();

  const [position, setPosition] = useState({latitude: 0, longitude:0})

  function handleManpClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }


  function handledelectImages(event: ChangeEvent<HTMLInputElement>){
    if (!event.target.files){
      return;
    }
    const SelectedImages = Array.from(event.target.files)
    setImages(SelectedImages)

    const SelectedImagesPreview = SelectedImages.map(image => {
      return URL.createObjectURL(image)
    })
    setPreviewImages(SelectedImagesPreview)
  }


  async function handleSubmit(event: FormEvent){
    event.preventDefault()
    const { latitude, longitude } = position;
    const data = new FormData();

    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(longitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    images.forEach(image => {
    data.append('images',image) })

    await api.post('orphanages', data);
    alert('cadastro')
    history.push('/app')
  }


  return (

    <div id="page-create-orphanage">
      <Sidebar/>
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
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
                <div className="images-container">
                  {previewImages?.map(image => {
                    return(
                      <img key={image} src={image} alt={name}></img>
                    )
                  })}
                  <label htmlFor='image[]' className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                  </label>
                </div>
                <input onChange={handledelectImages} type="file" id='image[]' multiple/>
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
                <button type="button" onClick={()=>{setOpenOnWeekends(true)}}  className={open_on_weekends ? 'active': ''}>Sim</button>
                <button type="button" onClick={()=>{setOpenOnWeekends(false)}} className={!open_on_weekends ? 'active': ''}>Não</button>
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
