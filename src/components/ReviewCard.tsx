import { Star, User } from "lucide-react";

export default function ReviewCard({ review }: any) {

  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-gray-100
      shadow-md
      p-6
      hover:shadow-xl
      transition-all
      duration-300
      "
    >

      {/* Header */}

      <div className="flex justify-between items-start">


        <div className="flex items-center gap-3">

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-blue-100
            flex
            items-center
            justify-center
            "
          >
            <User
              className="text-blue-600"
              size={24}
            />
          </div>


          <div>

            <h3 className="
            font-bold
            text-lg
            text-gray-800
            ">
              {review.username || "Anonymous"}
            </h3>


            <p className="
            text-sm
            text-gray-400
            ">
              {review.createdAt
                ? new Date(review.createdAt)
                    .toLocaleDateString()
                : "Recently"
              }
            </p>


          </div>

        </div>




        {/* Rating */}

        <div
          className="
          flex
          items-center
          gap-1
          bg-yellow-50
          px-3
          py-1
          rounded-full
          "
        >

          <Star
            size={16}
            fill="currentColor"
            className="text-yellow-400"
          />


          <span className="
          font-semibold
          text-yellow-600
          ">
            {review.rating}/5
          </span>


        </div>


      </div>





      {/* Comment */}

      <p
        className="
        mt-5
        text-gray-600
        leading-7
        text-base
        "
      >
        "{review.comment}"
      </p>




      {/* Bottom stars */}

      <div className="
      flex
      mt-5
      gap-1
      ">

        {[1,2,3,4,5].map((star)=>(

          <Star
            key={star}
            size={18}
            fill={
              star <= review.rating
              ? "currentColor"
              : "none"
            }
            className={
              star <= review.rating
              ? "text-yellow-400"
              : "text-gray-300"
            }
          />

        ))}

      </div>


    </div>
  );
}