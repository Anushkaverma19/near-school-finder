"use client";

import {
 MapContainer,
 TileLayer,
 Marker,
 Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


export default function SchoolMap({

lat,
lng,
name

}:{

lat:number;
lng:number;
name:string;

}){


return (

<div className="
h-[400px]
rounded-xl
overflow-hidden
mt-5
shadow-lg
">


<MapContainer

center={[lat,lng]}

zoom={15}

scrollWheelZoom={true}

style={{

height:"100%",

width:"100%"

}}

>


<TileLayer

attribution='&copy; OpenStreetMap contributors'

url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

/>



<Marker

position={[lat,lng]}

>


<Popup>

🏫 {name}

</Popup>


</Marker>



</MapContainer>


</div>

)

}