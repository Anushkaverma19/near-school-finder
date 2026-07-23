"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  LocateFixed,
  ImageIcon,
  FileText
} from "lucide-react";
import { useSession } from "next-auth/react";


export default function SchoolForm() {

const router = useRouter();

const {data:session}=useSession();


const [loading,setLoading]=useState(false);
const [locationLoading,setLocationLoading]=useState(false);
const [uploading,setUploading]=useState(false);

const [preview,setPreview]=useState("");



const [form,setForm]=useState({

name:"",
address:"",
city:"",
state:"",
country:"",
board:"",
phone:"",
email:"",
website:"",
description:"",
image:"",
latitude:"",
longitude:""

});




// ---------------- LOCATION ----------------


const getLocation=()=>{


setLocationLoading(true);


navigator.geolocation.getCurrentPosition(

async(position)=>{


const lat=position.coords.latitude;
const lng=position.coords.longitude;



setForm(prev=>({

...prev,

latitude:String(lat),
longitude:String(lng)

}));



try{


const res=await fetch(

`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`

);



const data=await res.json();



setForm(prev=>({

...prev,

city:
data.address.city ||
data.address.town ||
data.address.village ||
"",

state:
data.address.state || "",


country:
data.address.country || ""

}));



}
catch(err){

console.log(err);

}


setLocationLoading(false);



},


(error)=>{


console.log(error);

alert("Location permission required");

setLocationLoading(false);


}


);



};






// ---------------- IMAGE UPLOAD ----------------


const handleImage=async(e:any)=>{


const file=e.target.files[0];


if(!file)return;



setPreview(
URL.createObjectURL(file)
);



setUploading(true);



const formData=new FormData();


formData.append(
"file",
file
);



try{


const res=await fetch("/api/upload",{

method:"POST",

body:formData

});



const data=await res.json();



if(data.url){


setForm(prev=>({

...prev,

image:data.url

}));


}



}
catch(error){

console.log(error);

alert("Image upload failed");

}

finally{

setUploading(false);

}


};






// ---------------- SUBMIT ----------------


const submit=async(e:React.FormEvent)=>{


e.preventDefault();



if(!session?.user?.id){

alert("Please login first");

return;

}



if(uploading){

alert("Wait image uploading");

return;

}



setLoading(true);



try{


const res=await fetch("/api/schools",{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

...form,

createdBy:session.user.id

})


});



const data=await res.json();



console.log(data);



if(res.ok){


alert("School Added Successfully");

router.push("/dashboard");


}
else{


alert(
data.error || "Failed"
);


}



}
catch(err){

console.log(err);

alert("Something went wrong");

}

finally{


setLoading(false);


}


};
return (

<div className="max-w-2xl mx-auto animate-in fade-in duration-700">


<div className="
bg-white
rounded-3xl
shadow-2xl
p-8
border
">


<h1 className="text-3xl font-bold mb-2">
🏫 Add Your School
</h1>


<p className="text-gray-500 mb-8">
Fill school details and location
</p>



<form
onSubmit={submit}
className="space-y-6"
>



{/* NAME */}

<div>

<label className="font-semibold">
School Name
</label>


<input

required

value={form.name}

onChange={(e)=>
setForm(prev=>({
...prev,
name:e.target.value
}))
}

className="w-full border rounded-xl p-3 mt-2"

placeholder="Delhi Public School"

/>

</div>





{/* ADDRESS */}

<div>

<label className="font-semibold">
Address
</label>


<textarea

required

value={form.address}

onChange={(e)=>
setForm(prev=>({
...prev,
address:e.target.value
}))
}


className="
w-full
border
rounded-xl
p-3
mt-2
h-28
"

placeholder="Complete school address"

/>


</div>






{/* CITY */}

<div>

<label className="font-semibold">
City
</label>


<div className="
flex
items-center
border
rounded-xl
mt-2
px-3
">


<MapPin className="text-gray-400"/>


<input

value={form.city}

onChange={(e)=>
setForm(prev=>({
...prev,
city:e.target.value
}))
}


className="
w-full
p-3
outline-none
"

placeholder="Lucknow"

/>


</div>

</div>






{/* STATE */}

<div>

<label className="font-semibold">
State
</label>


<input

value={form.state}

onChange={(e)=>
setForm(prev=>({
...prev,
state:e.target.value
}))
}


className="
w-full
border
rounded-xl
p-3
mt-2
"

placeholder="Uttar Pradesh"

/>


</div>







{/* COUNTRY */}

<div>

<label className="font-semibold">
Country
</label>


<input

value={form.country}

onChange={(e)=>
setForm(prev=>({
...prev,
country:e.target.value
}))
}


className="
w-full
border
rounded-xl
p-3
mt-2
"


placeholder="India"

/>


</div>








{/* BOARD */}

<div>

<label className="font-semibold">
Board
</label>


<input

value={form.board}

onChange={(e)=>
setForm(prev=>({
...prev,
board:e.target.value
}))
}


className="
w-full
border
rounded-xl
p-3
mt-2
"


placeholder="CBSE / ICSE"

/>


</div>








{/* PHONE */}

<div>

<label className="font-semibold">
Phone Number
</label>


<input

value={form.phone}

onChange={(e)=>
setForm(prev=>({
...prev,
phone:e.target.value
}))
}


className="
w-full
border
rounded-xl
p-3
mt-2
"


placeholder="9876543210"

/>


</div>








{/* EMAIL */}

<div>

<label className="font-semibold">
Email
</label>


<input

type="email"

value={form.email}

onChange={(e)=>
setForm(prev=>({
...prev,
email:e.target.value
}))
}


className="
w-full
border
rounded-xl
p-3
mt-2
"


placeholder="info@school.com"

/>


</div>








{/* WEBSITE */}

<div>

<label className="font-semibold">
Website
</label>


<input

value={form.website}

onChange={(e)=>
setForm(prev=>({
...prev,
website:e.target.value
}))
}


className="
w-full
border
rounded-xl
p-3
mt-2
"


placeholder="https://school.com"

/>


</div>







{/* DESCRIPTION */}

<div>


<label className="
font-semibold
flex
gap-2
items-center
">


<FileText size={18}/>

School Description


</label>



<textarea


value={form.description}


onChange={(e)=>
setForm(prev=>({
...prev,
description:e.target.value
}))
}


placeholder="Write about your school"


className="
w-full
border
rounded-xl
p-3
mt-2
h-32
"


/>


</div>









{/* LOCATION */}


<div>


<button

type="button"

onClick={getLocation}

className="
flex
gap-2
items-center
bg-blue-100
text-blue-600
px-5
py-3
rounded-xl
"

>


<LocateFixed size={20}/>


{

locationLoading
?
"Detecting..."
:
"Use Current Location"

}


</button>



{

form.latitude &&

<p className="text-green-600 text-sm mt-2">

✓ Location captured

</p>

}



</div>










{/* IMAGE */}


<div>


<label className="font-semibold">
School Image
</label>



<div className="
border-2
border-dashed
rounded-xl
p-6
mt-2
text-center
">


<ImageIcon
className="mx-auto text-gray-400"
size={40}
/>



<input

type="file"

accept="image/*"

onChange={handleImage}

/>


</div>





{

preview &&

<img

src={preview}

className="
mt-4
h-48
w-full
object-cover
rounded-xl
"

/>

}




{

uploading &&

<p className="text-blue-600">
Uploading image...
</p>

}




</div>









<button

disabled={loading || uploading}


className="
w-full
bg-blue-600
text-white
py-3
rounded-xl
font-semibold
"

>


{

loading
?
"Adding School..."
:
"Add School"

}


</button>





</form>


</div>


</div>


);


}