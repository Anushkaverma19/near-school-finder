"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function DashboardPage(){

const {data:session,status}=useSession();

const router=useRouter();

const [schools,setSchools]=useState<any[]>([]);
const [loading,setLoading]=useState(true);


useEffect(()=>{


if (status === "unauthenticated") {
  signIn("google");
  return;
}


if(session){

fetch("/api/schools?owner=true")
.then(res=>res.json())
.then(data=>{
setSchools(data.schools || data);
setLoading(false);
});

}

},[session,status]);


async function deleteSchool(id:string){

const confirmDelete=confirm(
"Delete this school?"
);

if(!confirmDelete)return;


await fetch(
`/api/schools/${id}`,
{
method:"DELETE"
}
);


setSchools(
schools.filter(
(s)=>s._id!==id
)
);

}



if(loading){

return(
<div className="p-10 text-center">
Loading Dashboard...
</div>
)

}



return(

<div className="p-6">


<h1 className="text-3xl font-bold mb-2">

Welcome {session?.user?.name}

</h1>


<p className="text-gray-500 mb-8">
Your Created Schools
</p>



<div className="
grid 
md:grid-cols-3
gap-6
">


{
schools.map((school)=>(


<div
key={school._id}
className="
bg-white
rounded-xl
shadow-lg
p-4
hover:scale-105
transition
"
>


{
school.image &&
<Image
src={school.image}
width={400}
height={250}
alt={school.name}
className="
rounded-lg
h-48
object-cover
"
/>
}



<h2 className="
text-xl
font-bold
mt-3
">
{school.name}
</h2>


<p>
Created By:
{" "}
{session?.user?.name}
</p>


<div className="
flex
gap-3
mt-4
">


<button

onClick={()=>
router.push(
`/schools/${school._id}`
)
}

className="
bg-blue-500
text-white
px-4
py-2
rounded
"
>
View
</button>



<button

onClick={()=>
router.push(
`/schools/edit/${school._id}`
)
}

className="
bg-green-500
text-white
px-4
py-2
rounded
"
>
Update
</button>



<button

onClick={()=>
deleteSchool(school._id)
}

className="
bg-red-500
text-white
px-4
py-2
rounded
"
>
Delete
</button>


</div>


</div>


))
}


</div>


</div>

)

}