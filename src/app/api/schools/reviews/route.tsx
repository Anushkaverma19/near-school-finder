import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Review from "@/models/Review";
import School from "@/models/School";


export async function POST(req:NextRequest){

try{


await connectDB();


const body=await req.json();


const review = await Review.create({

school:body.schoolId,
username:body.username,
rating:body.rating,
comment:body.comment

});



await School.findByIdAndUpdate(
body.schoolId,
{
$push:{
reviews:review._id
}
}
);



return NextResponse.json(
review,
{
status:201
}
);


}
catch(error:any){

console.log(error);


return NextResponse.json(
{
message:"Review failed",
error:error.message
},
{
status:500
}
);


}

}