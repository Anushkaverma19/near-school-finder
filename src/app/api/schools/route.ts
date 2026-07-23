import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import School from "@/models/School";
import connectDB from "@/lib/mongoose";


// ADD SCHOOL
export async function POST(req: Request) {
  try {

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized"
        },
        {
          status: 401
        }
      );
    }


    await connectDB();


    const body = await req.json();



    const school = await School.create({

      name: body.name,

      address: body.address,

      city: body.city || "",

      state: body.state || "",

      country: body.country || "",

      board: body.board || "",

      phone: body.phone || "",

      email: body.email || "",

      website: body.website || "",


      // CLOUDINARY IMAGE URL
      image: body.image || "",


      // SCHOOL DESCRIPTION
      description: body.description || "",


      latitude: body.latitude,

      longitude: body.longitude,

location: {
  type: "Point",
  coordinates: [
    body.longitude,
    body.latitude,
  ],
},
      // NEW SCHOOL STARTS WITH ZERO REVIEWS
      reviews: [],


      createdBy: session.user.id,

    });




    return NextResponse.json(
      school,
      {
        status: 201
      }
    );


  } catch(error) {


    console.log(
      "ADD SCHOOL ERROR 👉",
      error
    );


    return NextResponse.json(
      {
        error:"Something went wrong"
      },
      {
        status:500
      }
    );


  }
}








// GET SCHOOLS
export async function GET(req: NextRequest) {

  try {


    await connectDB();


    const session = await auth();



    const owner =
      req.nextUrl.searchParams.get("owner") === "true";






    // OWNER DASHBOARD

    if(owner) {


      if(!session?.user?.id) {

        return NextResponse.json(
          {
            error:"Unauthorized"
          },
          {
            status:401
          }
        );

      }



      const mySchools =
        await School.find({
          createdBy: session.user.id
        })
        .sort({
          createdAt:-1
        });



      return NextResponse.json(mySchools);

    }








    // ALL SCHOOLS
const schools = await School.find()
  .sort({
    createdAt: -1
  })
  .lean();


const cleanSchools = schools.map((school:any)=>({
  ...school,
  reviews: school.reviews || []
}));


return NextResponse.json(cleanSchools);



  }
  catch(error) {


    console.log(
      "GET SCHOOL ERROR 👉",
      error
    );



    return NextResponse.json(
      {
        error:"Failed to fetch schools"
      },
      {
        status:500
      }
    );


  }

}