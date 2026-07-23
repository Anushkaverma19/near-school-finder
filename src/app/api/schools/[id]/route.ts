import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import School from "@/models/School";
import { auth } from "@/auth";
import "@/models/User";
import "@/models/Review";



// GET SINGLE SCHOOL

export async function GET(
req:NextRequest,
{
params
}:{
params:Promise<{id:string}>
}
){

try{


await connectDB();


const {id}=await params;



const school = await School.findById(id)
.populate(
"createdBy",
"name image email"
)
.populate({
path:"reviews",
model:"Review"
});



if(!school){

return NextResponse.json(
{
message:"School not found"
},
{
status:404
}
);

}

return NextResponse.json(
school,
{
status:200
}
);



}
catch(error:any){

console.log(error);


return NextResponse.json(
{
message:"Failed to fetch school",
error:error.message
},
{
status:500
}
);


}

}






// UPDATE SCHOOL

export async function PUT(
req:NextRequest,
{
params
}:{
params:Promise<{id:string}>
}
){

try{


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


const {id}=await params;


const body=await req.json();



const school=await School.findById(id);



if(!school){

return NextResponse.json(
{
message:"School not found"
},
{
status:404
}
);

}
if (
  !school.createdBy ||
  school.createdBy.toString() !== session.user.id
) {
  return NextResponse.json(
    {
      message: "You can only update your own school",
    },
    {
      status: 403,
    }
  );
}


const updated = await School.findByIdAndUpdate(
id,
{
name:body.name,
address:body.address,
city:body.city,
description:body.description,
image:body.image,
latitude:body.latitude,
longitude:body.longitude
},
{
new:true
}
);



return NextResponse.json(updated);



}
catch(error:any){

return NextResponse.json(
{
message:"Update failed"
},
{
status:500
}
);

}

}







// DELETE SCHOOL

export async function DELETE(
req:NextRequest,
{
params
}:{
params:Promise<{id:string}>
}
){

try{


const session=await auth();


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

const { id } = await params;

const school = await School.findById(id);

if (!school) {
  return NextResponse.json(
    {
      message: "School not found",
    },
    {
      status: 404,
    }
  );
}

if (
  !school.createdBy ||
  school.createdBy.toString() !== session.user.id
) {
  return NextResponse.json(
    {
      message: "You can only delete your own school",
    },
    {
      status: 403,
    }
  );
}
await school.deleteOne();

return NextResponse.json({
  message: "Deleted successfully",
});



}
catch(error:any){

return NextResponse.json(
{
message:"Delete failed"
},
{
status:500
}
);


}


}