"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FavoritesPage() {

  const [favorites,setFavorites] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);


  const getFavorites = async()=>{

    try{

      const res = await fetch("/api/favorites");

      const data = await res.json();

      setFavorites(data);

    }
    catch(err){

      console.log(err);

    }
    finally{

      setLoading(false);

    }

  };


  useEffect(()=>{

    getFavorites();

  },[]);



  if(loading){

    return (
      <div className="p-10 text-center">
        Loading favorites...
      </div>
    )

  }



  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-8">


      <h1 className="text-4xl font-bold text-gray-900 mb-10">
        ❤️ My Favourite Schools
      </h1>



      {
      favorites.length === 0 ?

      (

        <div className="bg-white rounded-3xl shadow p-10 text-center">

          <h2 className="text-xl font-semibold">
            No Favourite Schools Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Like schools to see them here
          </p>

        </div>

      )

      :

      (

      <div className="grid md:grid-cols-3 gap-8">


      {
      favorites.map((fav)=>(


        <div
        key={fav._id}
        className="
        bg-white
        rounded-3xl
        shadow-xl
        overflow-hidden
        hover:-translate-y-2
        transition
        "
        >


        {
        fav.image &&

        <div className="relative h-56">

          <Image
          src={fav.image}
          alt={fav.schoolName}
          fill
          className="object-cover"
          />

        </div>

        }



        <div className="p-6">


        <h2 className="text-2xl font-bold text-gray-800">
          {fav.schoolName}
        </h2>


        <p className="text-gray-500 mt-3">
          📍 {fav.address}
        </p>



        <Link

        href={`/schools/${fav.schoolId}`}

        className="
        block
        text-center
        mt-5
        bg-blue-600
        text-white
        py-3
        rounded-xl
        "

        >

        View School

        </Link>


        </div>


        </div>


      ))

      }


      </div>

      )


      }


    </main>

  );

}