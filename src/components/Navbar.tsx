"use client";

import Link from "next/link";
import { School, User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";


export default function Navbar(){


const {data:session}=useSession();

const [open,setOpen]=useState(false);



return(

<nav className="
bg-white
shadow
px-8
py-5
flex
justify-between
items-center
">


{/* Logo */}

<Link

href="/"

className="
flex
items-center
gap-3
text-xl
font-bold
text-blue-600
"

>

<School/>

NearSchool

</Link>





{/* Menu */}

<div className="
flex
items-center
gap-6
font-semibold
">


<Link href="/">
Home
</Link>



<Link href="/schools?nearby=true">
  Schools
</Link>





{
session &&

<>


<Link href="/dashboard">

Dashboard

</Link>



<Link href="/schools/add">

Add School

</Link>


</>


}





{


session ?


<div className="relative">


<button

onClick={()=>setOpen(!open)}

className="
flex
items-center
gap-2
bg-blue-50
px-4
py-2
rounded-xl
"

>


<div className="flex items-center gap-2">
  {session.user?.image ? (
    <img
      src={session.user.image}
      alt="Profile"
      className="w-9 h-9 rounded-full border-2 border-blue-500"
    />
  ) : (
    <User size={20} />
  )}

  <span className="hidden md:block">
    {session.user?.name}
  </span>
</div>


</button>





{


open &&


<div className="
absolute
right-0
top-14
bg-white/80
backdrop-blur-md
border-b
border-gray-200
sticky
top-0

rounded-xl
p-5
w-64
z-50
">


<h3 className="font-bold">

{
session.user?.name
}

</h3>



<p className="
text-sm
text-gray-500
mb-4
">

{
session.user?.email
}

</p>


<Link
  href="/favourites"
  className="hover:text-blue-600 transition relative
hover:text-blue-600
transition-all
duration-300 "
>
  ❤️ Favourites
</Link>

<Link

href="/dashboard"

className="
block
bg-blue-600
text-white
text-center
py-2
rounded-lg
mb-3 relative
hover:text-blue-600
transition-all
duration-300
"

>

My Schools

</Link>




<button

onClick={() =>
  signOut({
    callbackUrl: "/",
  })
}

className="
w-full
bg-red-500
text-white
py-2
rounded-lg
"

>

Logout

</button>



</div>


}



</div>



:


<button

onClick={()=>signIn("google")}

className="
bg-blue-600
text-white
px-5
py-2
rounded-lg
hover:bg-blue-700
"

>

Login

</button>



}



</div>


</nav>

)

}