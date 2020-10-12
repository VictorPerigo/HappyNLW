import React from 'react';
import {Link} from 'react-router-dom'
import {FiPlus} from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import '../styles/pages/Orphanages-map.css'
import mapMarkerImg from '../images/map-marker.svg'

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
            </Map>
            
            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>

        </div>
    )
}

export default OrphanagesMap;