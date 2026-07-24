"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  Heart,
  MapPin,
  Star,
  School,
  Phone,
  Globe,
  Pencil,
  Trash2,
  Eye,
  MessageCircle,
} from "lucide-react";


export default function SchoolCard({
  school,
  owner = false,
}: {
  school: any;
  owner?: boolean;
}) {

console.log("SCHOOL DATA 👉", school);

const [liked, setLiked] = useState(false);


const schoolId = school._id || school.id;




// ONLY REAL LIKES
const likes = school.likes || 0;

  const deleteSchool = async () => {


    const confirmDelete = confirm(
      "Are you sure you want to delete this school?"
    );


    if(!confirmDelete) return;



    await fetch(
      `/api/schools/${schoolId}`,
      {
        method:"DELETE"
      }
    );


    window.location.reload();


  };




  const rating = school.rating ?? 4.5;


const reviews = school.reviews?.length || 0;


  return (

<div
className="
group
bg-white
rounded-[35px]
overflow-hidden
shadow-xl
hover:shadow-2xl
transition-all
duration-500
hover:-translate-y-3
border
border-gray-100
"
>


{/* IMAGE */}


<div className="
relative
h-64
overflow-hidden
">


{school.image ? (

<Image
  src={school.image}
  alt={school.name || "School Image"}
  fill
  sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
  className="
  object-cover
  transition-transform
  duration-700
  group-hover:scale-110
  "
/>

) : (
<div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
  <span className="text-gray-500">
    No Image
  </span>
</div>

)}


<div className="
absolute
inset-0
bg-gradient-to-t
from-black/60
to-transparent
"
/>



{/* Rating */}


<div
className="
absolute
top-4
left-4
bg-yellow-400
text-white
px-3
py-1
rounded-full
flex
items-center
gap-1
text-sm
font-semibold
"
>


<Star size={15} fill="white"/>

{rating}


</div>




{/* Heart */}


<button

onClick={()=>setLiked(!liked)}

className="
absolute
top-4
right-4
bg-white
p-2.5
rounded-full
shadow-lg
hover:scale-110
transition
"

>


<Heart

size={20}

className={
liked
?
"fill-red-500 text-red-500 scale-125"
:
"text-gray-500"
}

/>


</button>





{/* Board */}


{
school.board &&

<div

className="
absolute
bottom-4
left-4
bg-blue-600
text-white
px-3
py-1
rounded-full
text-xs
font-semibold
"

>

{school.board}

</div>

}





</div>






{/* CONTENT */}



<div className="p-7">



<h2 className="
text-2xl
font-bold
text-gray-800
">

{school.name}

</h2>




<div className="
flex
gap-2
items-center
mt-3
text-gray-600
">

<MapPin size={18}/>

<span>
{school.address}
</span>

</div>





<div className="
flex
gap-2
items-center
mt-2
text-gray-600
">

<School size={18}/>

<span>
{school.city}
</span>


</div>
{school.distance !== undefined && (
  <div
    className="
    flex
    gap-2
    items-center
    mt-2
    text-green-600
    font-semibold
    "
  >
    <MapPin size={18} />
    <span>{school.distance.toFixed(1)} km away</span>
  </div>
)}

{school.description && (
  <p className="
  mt-3
  text-gray-600
  line-clamp-3
  ">
    {school.description}
  </p>
)}



{
school.phone &&

<div className="
flex
gap-2
items-center
mt-2
text-gray-600
">

<Phone size={18}/>

<span>
{school.phone}
</span>

</div>

}





{
school.website &&

<div className="
flex
gap-2
items-center
mt-2
">

<Globe size={18}/>


<a

href={school.website}

target="_blank"

className="
text-blue-600
hover:underline
"

>

Visit Website

</a>


</div>

}





{/* STATS */}



<div className="
flex
justify-between
items-center
mt-5
">


<div className="
flex
items-center
gap-2
text-yellow-500
font-semibold
">

<Star
size={18}
fill="currentColor"
/>

{rating}

</div>



<div className="
flex
items-center
gap-2
text-red-500
">

<Heart
size={18}
fill="currentColor"
/>

{likes}

</div>




<div className="
flex
items-center
gap-2
text-gray-600
">

<MessageCircle size={18}/>

{reviews}

</div>



</div>






{/* BUTTONS */}



<div className="
grid
grid-cols-2
gap-3
mt-6
">


<Link

href={`/schools/${schoolId}`}

className="
flex
items-center
justify-center
gap-2
bg-gradient-to-r
from-blue-600
to-cyan-600
hover:scale-105
text-white
py-3
rounded-xl
font-semibold
transition
"

>


<Eye size={18}/>

View Details


</Link>




<Link

href={`/schools/${schoolId}#reviews`}

className="
flex
items-center
justify-center
gap-2
bg-gradient-to-r
from-yellow-400
to-orange-500
hover:scale-105
text-white
py-3
rounded-xl
font-semibold
transition
"

>


<MessageCircle size={18}/>

Reviews


</Link>


</div>






{/* OWNER */}


{
owner &&


<div className="
grid
grid-cols-2
gap-3
mt-4
">


<Link

href={`/schools/edit/${schoolId}`}

className="
flex
items-center
justify-center
gap-2
bg-purple-600
text-white
py-3
rounded-xl
"

>

<Pencil size={18}/>

Update

</Link>





<button

onClick={deleteSchool}

className="
flex
items-center
justify-center
gap-2
bg-red-600
text-white
py-3
rounded-xl
"

>

<Trash2 size={18}/>

Delete

</button>



</div>


}



</div>


</div>


);


}