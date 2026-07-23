"use client";

import { useState } from "react";
import SchoolCard from "./SchoolCard";


export default function NearbySchools() {


  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);



  const findSchools = () => {


    if (!navigator.geolocation) {

      alert(
        "Geolocation is not supported"
      );

      return;

    }



    setLoading(true);



    navigator.geolocation.getCurrentPosition(

      async(position)=>{


        try {


          const lat =
          position.coords.latitude;


          const lng =
          position.coords.longitude;



          const res = await fetch(
            `/api/schools/nearby?lat=${lat}&lng=${lng}`
          );



          const data =
          await res.json();



          if(Array.isArray(data)){

            setSchools(data);

          }
          else{

            setSchools([]);

          }



        }
        catch(error){


          console.log(
            "Nearby Error:",
            error
          );


          alert(
            "Failed to fetch nearby schools"
          );


        }
        finally{

          setLoading(false);

        }



      },


      (error)=>{


        console.log(error);


        alert(
          "Please allow location permission"
        );


        setLoading(false);


      },


      {
        enableHighAccuracy:true,
        timeout:10000,
        maximumAge:0
      }


    );



  };





  return (

    <div>


      <button

        onClick={findSchools}

        className="
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-xl
        font-semibold
        hover:bg-blue-700
        "

      >

        {
          loading
          ?
          "Finding Schools..."
          :
          "Nearby Schools"
        }


      </button>





      {
        schools.length > 0 && (

          <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mt-8
          "
          >


          {
            schools.map(
              (school)=>(


                <SchoolCard

                key={
                  school._id ||
                  school.id
                }

                school={school}

                />


              )
            )
          }


          </div>

        )
      }





      {
        !loading &&
        schools.length===0 && (

          <p className="mt-6 text-gray-500">

            Click Nearby Schools to find schools near you

          </p>

        )
      }



    </div>

  );


}