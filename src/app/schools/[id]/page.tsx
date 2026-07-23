import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Star, Heart } from "lucide-react";
import ReviewCard from "@/components/ReviewCard";
import AddReviewButton from "@/components/AddReviewButton";


async function getSchool(id: string) {

  const res = await fetch(
    `http://localhost:3000/api/schools/${id}`,
    {
      cache: "no-store"
    }
  );


  if (!res.ok) return null;


  return res.json();

}



export default async function SchoolDetailsPage({

  params,

}: {

  params: Promise<{ id:string }>;

}) {


  const { id } = await params;


  const school = await getSchool(id);



  if (!school) notFound();



  const dummyReviews = [
  {
    username: "Rahul Sharma",
    rating: 5,
    comment: "Excellent teachers and clean campus.",
  },
  {
    username: "Ananya Gupta",
    rating: 5,
    comment: "Best school for academics and sports.",
  },
  {
    username: "Aarav Singh",
    rating: 4,
    comment: "Friendly environment with modern classrooms.",
  },
];


// Dummy listing ke liye hi dummy reviews
const reviews = school.id
  ? [
      ...dummyReviews,
      ...(school.reviews || [])
    ]
  : [
      ...(school.reviews || [])
    ];


  return (

    <div className="min-h-screen bg-slate-100 py-10 px-5">


      <div className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl">



        <div className="relative h-96">


          {
            school.image && (

              <Image
                src={school.image}
                alt={school.name || "School image"}
                fill
                className="object-cover"
              />

            )
          }



          <div className="absolute inset-0 bg-black/40"/>



          <div className="absolute bottom-6 left-6 text-white">


            <h1 className="text-5xl font-bold">

              {school.name}

            </h1>



            <p className="flex items-center gap-2 mt-3">

              <MapPin size={18}/>

              {school.address}, {school.city}

            </p>



          </div>



          <button className="absolute top-5 right-5 bg-white rounded-full p-3 shadow-lg">

            <Heart
              className="text-red-500"
              fill="red"
            />

          </button>



        </div>





        <div className="p-8">



          <div className="flex justify-between items-center flex-wrap gap-4">


            <div className="flex items-center gap-2 text-yellow-500 text-xl font-bold">

              <Star fill="currentColor"/>

              {school.rating || 4.7}

            </div>



            {
              school.distance && (

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                  📍 {school.distance} km Away

                </span>

              )
            }


          </div>





          {/* MAP */}

          {
            school.latitude &&
            school.longitude && (

              <div className="mt-8">

                <h2 className="text-2xl font-bold mb-4">

                  📍 School Location

                </h2>



                <iframe

                  width="100%"

                  height="320"

                  loading="lazy"

                  className="rounded-2xl border"

                  src={`https://maps.google.com/maps?q=${school.latitude},${school.longitude}&z=15&output=embed`}

                />

              </div>

            )
          }





          {/* ABOUT */}

          <div className="mt-8">


            <h2 className="text-2xl font-bold mb-4">

              🏫 About School

            </h2>



            <p className="text-gray-600 leading-7">

              {
                school.description ||
                "No description available."
              }

            </p>


          </div>







          {/* REVIEWS */}


          <div id="reviews" className="mt-10">


            <div className="flex justify-between items-center mb-6">


              <h2 className="text-2xl font-bold">

                ⭐ Student Reviews

              </h2>



              <AddReviewButton schoolId={id}/>


            </div>





            <div className="flex items-center gap-3 mb-6">


              <Star
                fill="currentColor"
                className="text-yellow-400"
              />



              <span className="text-xl font-bold">


                {
                  reviews.length
                  ?
                  (
                    reviews.reduce(
                      (sum:number,r:any)=>
                      sum+r.rating,
                      0
                    )
                    /
                    reviews.length
                  ).toFixed(1)

                  :

                  school.rating || "4.7"

                }


              </span>



              <span className="text-gray-500">

                ({reviews.length} Reviews)

              </span>


            </div>







            {
              reviews.length > 0

              ?

              reviews.map(
                (review:any,index:number)=>(

                  <ReviewCard

                    key={review._id || index}

                    review={review}

                  />

                )
              )


              :


              <div className="bg-blue-50 border rounded-2xl p-8 text-center">


                <h3 className="font-semibold text-lg">

                  No Reviews Yet

                </h3>



                <p className="text-gray-500 mt-2">

                  Be the first person to review this school.

                </p>


              </div>

            }



          </div>



        </div>



      </div>



    </div>

  );

}