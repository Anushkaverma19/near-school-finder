import Link from "next/link";


export default function AboutPage(){

return(

<div className="bg-gray-50 min-h-screen">


<section className="
py-20
text-center
bg-gradient-to-r
from-blue-600
to-indigo-600
text-white
">


<h1 className="
text-5xl
font-bold
">

Find Better Schools,
Make Better Decisions

</h1>


<p className="
mt-5
text-lg
max-w-3xl
mx-auto
">

NearSchool helps parents discover,
compare and save schools based on
location, ratings and boards.

</p>


<Link

href="/schools"

className="
inline-block
mt-8
bg-white
text-blue-600
px-8
py-3
rounded-xl
font-semibold
"

>

Explore Schools

</Link>


</section>



<section className="
max-w-6xl
mx-auto
py-16
px-6
">


<h2 className="
text-3xl
font-bold
text-center
">

Why NearSchool?

</h2>



<div className="
grid
md:grid-cols-3
gap-8
mt-10
">


<div className="
bg-white
p-8
rounded-2xl
shadow
hover:-translate-y-2
transition
">

<h3 className="text-xl font-bold">

📍 Nearby Search

</h3>

<p className="text-gray-600 mt-3">

Find schools according to your location.

</p>

</div>



<div className="
bg-white
p-8
rounded-2xl
shadow
hover:-translate-y-2
transition
">

<h3 className="text-xl font-bold">

⭐ Smart Comparison

</h3>

<p className="text-gray-600 mt-3">

Compare ratings, boards and details.

</p>

</div>



<div className="
bg-white
p-8
rounded-2xl
shadow
hover:-translate-y-2
transition
">

<h3 className="text-xl font-bold">

❤️ Save Favorites

</h3>

<p className="text-gray-600 mt-3">

Save schools you like for later.

</p>

</div>


</div>


</section>



<section className="
bg-white
py-16
text-center
">


<h2 className="
text-3xl
font-bold
">

How it Works?

</h2>


<div className="
flex
justify-center
gap-10
mt-10
flex-wrap
">


<div>
<span className="text-4xl">
1️⃣
</span>
<p>
Search Schools
</p>
</div>


<div>
<span className="text-4xl">
2️⃣
</span>
<p>
Compare Details
</p>
</div>


<div>
<span className="text-4xl">
3️⃣
</span>
<p>
Choose Best
</p>
</div>


</div>


</section>


</div>

)

}