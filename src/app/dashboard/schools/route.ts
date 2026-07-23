import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import School from "@/models/School";


export async function GET(){

try{

const session = await auth();


if(!session?.user?.id){

return NextResponse.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}


await connectDB();


const schools = await School.find({
createdBy:session.user.id
});


return NextResponse.json(schools);


}
catch(error){

console.log(error);

return NextResponse.json(
{
error:"Server error"
},
{
status:500
}
);

}

}