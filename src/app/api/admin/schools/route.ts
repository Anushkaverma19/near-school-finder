import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import School from "@/models/School";


// GET ALL SCHOOLS

export async function GET() {

  try {

    await connectDB();


    const schools = await School
      .find()
      .sort({
        createdAt: -1
      })
      .lean();



    return NextResponse.json(
      schools
    );


  } catch(error) {


    console.log(
      "GET SCHOOL ERROR:",
      error
    );


    return NextResponse.json(
      {
        message:"Failed to fetch schools"
      },
      {
        status:500
      }
    );

  }

}





// CREATE SCHOOL

export async function POST(
  req: NextRequest
) {

  try {


    await connectDB();



    const body = await req.json();



    if(
      !body.name ||
      !body.address ||
      !body.city ||
      !body.latitude ||
      !body.longitude
    ){

      return NextResponse.json(
        {
          message:
          "Required fields missing"
        },
        {
          status:400
        }
      );

    }




    const school = await School.create({

      name: body.name,

      image: body.image || "",

      address: body.address,

      city: body.city,

      phone: body.phone || "",

      email: body.email || "",

      description:
      body.description || "",

      facilities:
      body.facilities || [],

      fees:
      body.fees || "",

      latitude:
      Number(body.latitude),

      longitude:
      Number(body.longitude)

    });




    return NextResponse.json(
      school,
      {
        status:201
      }
    );



  } catch(error){


    console.log(
      "CREATE SCHOOL ERROR:",
      error
    );



    return NextResponse.json(
      {
        message:"Failed to create school"
      },
      {
        status:500
      }
    );

  }

}