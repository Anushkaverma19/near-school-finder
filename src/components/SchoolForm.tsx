"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, LocateFixed } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SchoolForm() {

  const router = useRouter();
  const { data: session } = useSession();

  const [loading,setLoading] = useState(false);
  const [uploading,setUploading] = useState(false);
  const [locationLoading,setLocationLoading] = useState(false);
  const [preview,setPreview] = useState("");

  const [form,setForm] = useState({
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


  const update = (key:string,value:string)=>{
    setForm(prev=>({
      ...prev,
      [key]:value
    }));
  };


  const validate = ()=>{

    if(!form.name || !form.address || !form.city || !form.state){
      alert("Please fill required fields");
      return false;
    }


    if(!/^[6-9]\d{9}$/.test(form.phone)){
      alert("Enter valid 10 digit phone number");
      return false;
    }


    if(form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ){
      alert("Invalid email");
      return false;
    }


    if(form.website){
      try{
        new URL(form.website);
      }
      catch{
        alert("Invalid website URL");
        return false;
      }
    }


    if(!form.image){
      alert("Upload school image");
      return false;
    }


    return true;
  };



  const getLocation = ()=>{

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async(pos)=>{

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setForm(prev=>({
          ...prev,
          latitude:String(lat),
          longitude:String(lng)
        }));


        try{

          const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          const data = await res.json();

          setForm(prev=>({
            ...prev,
            city:data.address.city || data.address.town || "",
            state:data.address.state || "",
            country:data.address.country || ""
          }));

        }
        catch(e){
          console.log(e);
        }

        setLocationLoading(false);

      },

      ()=>{
        alert("Location permission required");
        setLocationLoading(false);
      }
    );

  };



  const handleImage = async(e:any)=>{

    const file=e.target.files[0];

    if(!file) return;


    if(file.size > 5*1024*1024){
      alert("Image must be under 5MB");
      return;
    }


    setPreview(URL.createObjectURL(file));

    setUploading(true);


    const data=new FormData();

    data.append("file",file);


    try{

      const res=await fetch("/api/upload",{
        method:"POST",
        body:data
      });

      const result=await res.json();

      update("image",result.url);

    }
    catch{
      alert("Upload failed");
    }

    setUploading(false);

  };
    const submit = async(e:React.FormEvent)=>{

    e.preventDefault();


    if(!session?.user?.id){
      alert("Please login first");
      return;
    }


    if(!validate()) return;


    if(uploading){
      alert("Image uploading...");
      return;
    }


    setLoading(true);


    try{

      const res = await fetch("/api/schools",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          ...form,
          createdBy:session.user.id
        })

      });


      const data = await res.json();


      if(res.ok){

        alert("School Added Successfully");
        router.push("/dashboard");

      }
      else{

        alert(data.error || "Failed");

      }


    }
    catch{

      alert("Something went wrong");

    }


    setLoading(false);

  };



  return (

<div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">


<h1 className="text-3xl font-bold mb-2">
🏫 Add Your School
</h1>

<p className="text-gray-500 mb-8">
Fill school details
</p>



<form onSubmit={submit} className="space-y-5">


{[
 ["name","School Name"],
 ["address","Address"],
 ["city","City"],
 ["state","State"],
 ["country","Country"],
 ["board","Board"],
 ["phone","Phone"],
 ["email","Email"],
 ["website","Website"]
].map(([key,label])=>(


<div key={key}>

<label className="font-semibold">
{label}
</label>


<input

required={
["name","address","city","state","country","board"]
.includes(key)
}

type={key==="email"?"email":"text"}

maxLength={key==="phone"?10:undefined}

value={(form as any)[key]}

onChange={(e)=>{

let value=e.target.value;


if(key==="phone"){
 value=value.replace(/\D/g,"");
}


update(key,value);

}}

className="w-full border rounded-xl p-3 mt-2"

placeholder={label}

/>


</div>


))}



<div>

<label className="font-semibold">
Description
</label>


<textarea

value={form.description}

onChange={(e)=>update("description",e.target.value)}

className="w-full border rounded-xl p-3 mt-2 h-28"

/>

</div>





<button

type="button"

onClick={getLocation}

className="flex items-center gap-2 bg-blue-100 text-blue-600 px-5 py-3 rounded-xl"

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
<p className="text-green-600 text-sm">
✓ Location captured
</p>
}




<div>

<label className="font-semibold">
School Image
</label>


<input

type="file"

accept="image/*"

onChange={handleImage}

className="mt-2"

/>


{
preview &&
<img

src={preview}

className="mt-4 h-48 w-full object-cover rounded-xl"

/>
}


{
uploading &&
<p className="text-blue-600">
Uploading...
</p>
}


</div>



<button

disabled={loading || uploading}

className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"

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

  );

}