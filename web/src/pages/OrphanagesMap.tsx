import React from 'react';
import {Link} from 'react-router-dom'
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import '../styles/pages/Orphanages-map.css'
import mapMarkerImg from '../images/map-marker.svg'
import MapIcon from '../utils/mapIcon';


function OrphanagesMap(){
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :]</p>
                </header>
                <footer>
                    <strong>Anápolis</strong>
                    <strong>Goias</strong>
                </footer>
            </aside>

            <Map
            center={[-16.3342454,-48.9431261]}
            zoom={15}
            style={{ width: '100%', height: '100%'}}
            >
            <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>

            <Marker
            icon={MapIcon}
            position={[-16.3342454,-48.9431261]}>

            <Popup closeButton={false}minWidth={240}maxWidth={240}className='map-popup'>
                lar das meninas
                <Link to="orphanages/1">
                    <FiArrowRight size={20} color="#FFF"/>
                </Link>
            </Popup>

            </Marker>
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>

        </div>
    )
}

export default OrphanagesMap;