"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function EditSchoolPage(){


const params = useParams();

const router = useRouter();


const id = params.id as string;



const [form,setForm] = useState({

name:"",
address:"",
city:"",
state:"",
board:"",
facilities:""

});



const [loading,setLoading] = useState(true);





useEffect(()=>{


const fetchSchool = async()=>{


const res = await fetch(
`/api/schools/${id}`
);


const data = await res.json();



setForm({

name:data.name || "",

address:data.address || "",

city:data.city || "",

state:data.state || "",

board:data.board || "",

facilities:data.facilities || ""

});



setLoading(false);



};



if(id){

fetchSchool();

}


},[id]);







const updateSchool = async(e:React.FormEvent)=>{


e.preventDefault();



const res = await fetch(

`/api/schools/${id}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(form)

}

);




if(res.ok){

alert("School Updated Successfully");

router.push("/dashboard");

}



};





if(loading){

return (

<div className="p-10 text-center">

Loading...

</div>

)

}




return (

<div className="min-h-screen bg-gray-50 p-8">


<div className="max-w-3xl mx-auto bg-white rounded-3xl shadow p-8">


<h1 className="text-3xl font-bold mb-8">

Edit School

</h1>




<form

onSubmit={updateSchool}

className="space-y-5"

>


<input

value={form.name}

onChange={(e)=>setForm({
...form,
name:e.target.value
})}

className="w-full border rounded-xl p-4"

placeholder="School Name"

/>





<textarea

value={form.address}

onChange={(e)=>setForm({
...form,
address:e.target.value
})}

className="w-full border rounded-xl p-4"

placeholder="Address"

/>






<input

value={form.city}

onChange={(e)=>setForm({
...form,
city:e.target.value
})}

className="w-full border rounded-xl p-4"

placeholder="City"

/>






<input

value={form.state}

onChange={(e)=>setForm({
...form,
state:e.target.value
})}

className="w-full border rounded-xl p-4"

placeholder="State"

/>







<select

value={form.board}

onChange={(e)=>setForm({
...form,
board:e.target.value
})}

className="w-full border rounded-xl p-4"

>


<option value="">
Select Board
</option>


<option value="CBSE">
CBSE
</option>


<option value="ICSE">
ICSE
</option>


<option value="State Board">
State Board
</option>


</select>






<input

value={form.facilities}

onChange={(e)=>setForm({
...form,
facilities:e.target.value
})}

className="w-full border rounded-xl p-4"

placeholder="Facilities"

/>







<button

className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"

>

Update School

</button>




</form>



</div>


</div>

);


}