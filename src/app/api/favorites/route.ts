import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Favorite from "@/models/Favorite";


// GET USER FAVORITES
export async function GET() {

  try {

    const session = await auth();


    if (!session?.user?.email) {

      return NextResponse.json(
        {
          message: "Unauthorized"
        },
        {
          status:401
        }
      );

    }


    await connectDB();


    const favorites = await Favorite.find({
      userEmail: session.user.email
    });


    return NextResponse.json(
      favorites,
      {
        status:200
      }
    );


  } catch(error){

    console.log(error);

    return NextResponse.json(
      {
        message:"Error fetching favorites"
      },
      {
        status:500
      }
    );

  }

}



// ADD FAVORITE
export async function POST(req:Request){

  try{

    const session = await auth();


    if(!session?.user?.email){

      return NextResponse.json(
        {
          message:"Unauthorized"
        },
        {
          status:401
        }
      );

    }


    await connectDB();


    const body = await req.json();


    const favorite = await Favorite.create({

      userEmail:session.user.email,

      schoolId:body.schoolId,

      schoolName:body.schoolName,

      image:body.image,

      address:body.address

    });


    return NextResponse.json(
      favorite,
      {
        status:201
      }
    );


  }catch(error){

    console.log(error);


    return NextResponse.json(
      {
        message:"Error adding favorite"
      },
      {
        status:500
      }
    );

  }

}