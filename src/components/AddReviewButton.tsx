"use client";

import { useState } from "react";
import { Star } from "lucide-react";


export default function AddReviewButton({
  schoolId,
}: {
  schoolId: string;
}) {

  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState("");

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");


  async function submitReview() {

    if (!username || !comment) {
      alert("Please fill all fields");
      return;
    }


    const res = await fetch("/api/schools/reviews", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        schoolId,

        username,

        rating,

        comment,

      }),

    });


    if(res.ok){

      alert("Review Added");

      setUsername("");

      setComment("");

      setRating(5);

      setOpen(false);

      window.location.reload();

    }

  }



  return (

    <div>

      <button

        onClick={()=>setOpen(true)}

        className="bg-blue-600 text-white px-5 py-2 rounded-xl"

      >

        Add Review

      </button>



      {
        open && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


            <div className="bg-white rounded-2xl p-6 w-full max-w-md">


              <h2 className="text-2xl font-bold mb-5">
                Write Review
              </h2>



              <input

                placeholder="Your Name"

                value={username}

                onChange={(e)=>setUsername(e.target.value)}

                className="w-full border rounded-xl p-3 mb-4"

              />



              <div className="flex gap-2 mb-4">


                {
                  [1,2,3,4,5].map((star)=>(

                    <Star

                      key={star}

                      size={30}

                      onClick={()=>setRating(star)}

                      className={`cursor-pointer ${
                        star <= rating
                        ?
                        "text-yellow-400 fill-yellow-400"
                        :
                        "text-gray-300"
                      }`}

                    />

                  ))
                }


              </div>




              <textarea

                placeholder="Write your review"

                value={comment}

                onChange={(e)=>setComment(e.target.value)}

                className="w-full border rounded-xl p-3 h-28 mb-4"

              />



              <div className="flex gap-3">


                <button

                  onClick={submitReview}

                  className="bg-green-600 text-white px-5 py-2 rounded-xl"

                >

                  Submit

                </button>



                <button

                  onClick={()=>setOpen(false)}

                  className="bg-gray-200 px-5 py-2 rounded-xl"

                >

                  Cancel

                </button>


              </div>


            </div>


          </div>

        )
      }


    </div>

  );

}