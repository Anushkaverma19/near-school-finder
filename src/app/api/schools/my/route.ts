import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import School from "@/models/School";


export async function GET(){

  try {


    const session = await auth();


    if(!session?.user?.id){

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



    const schools = await School.find({

      createdBy: session.user.id

    })
    .sort({
      createdAt:-1
    });



    return NextResponse.json(schools);



  } catch(error){


    console.error(error);


    return NextResponse.json(
      {
        message:"Server error"
      },
      {
        status:500
      }
    );


  }

}