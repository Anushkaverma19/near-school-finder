"use client";

import {useEffect,useState} from "react";


export default function MyListings(){

const [schools,setSchools]=useState([]);


useEffect(()=>{

fetch("/api/schools/my")
.then(res=>res.json())
.then(data=>setSchools(data));

},[]);



return (

<div className="p-10">

<h1 className="text-3xl font-bold">
My Listings
</h1>


<div className="grid md:grid-cols-3 gap-5 mt-5">

{
schools.map((school:any)=>(

<div 
key={school._id}
className="border p-5 rounded"
>

<h2 className="font-bold">
{school.name}
</h2>

<p>{school.city}</p>


<button>
Edit
</button>


</div>

))
}


</div>

</div>

)

}