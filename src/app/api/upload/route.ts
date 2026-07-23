import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";


export async function POST(req: Request) {

  try {


    const formData = await req.formData();


    const file = formData.get("file") as File;



    if (!file) {

      return NextResponse.json(
        {
          message: "No file found"
        },
        {
          status: 400
        }
      );

    }



    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME;


    const apiKey =
      process.env.CLOUDINARY_API_KEY;


    const apiSecret =
      process.env.CLOUDINARY_API_SECRET;



    if (
      !cloudName ||
      !apiKey ||
      !apiSecret
    ) {

      return NextResponse.json(
        {
          message: "Cloudinary config missing"
        },
        {
          status: 500
        }
      );

    }




    // Convert file to buffer

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);





    const timestamp =
      Math.floor(
        Date.now() / 1000
      );





    // Cloudinary signature

    const paramsToSign =
      `folder=schools&timestamp=${timestamp}`;



    const signature =
      crypto
        .createHash("sha1")
        .update(
          paramsToSign + apiSecret
        )
        .digest("hex");







    const uploadData = new FormData();



    uploadData.append(
      "file",
      new Blob([buffer]),
      file.name
    );


    uploadData.append(
      "api_key",
      apiKey
    );


    uploadData.append(
      "timestamp",
      timestamp.toString()
    );


    uploadData.append(
      "signature",
      signature
    );


    uploadData.append(
      "folder",
      "schools"
    );







    const response = await fetch(

      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,

      {
        method: "POST",
        body: uploadData
      }

    );







    const result = await response.json();



    console.log(
      "CLOUDINARY RESPONSE 👉",
      result
    );







    if (!response.ok) {


      return NextResponse.json(
        {
          message: "Cloudinary upload failed",
          error: result
        },
        {
          status: 500
        }
      );


    }








    return NextResponse.json(

      {
        url: result.secure_url
      },

      {
        status: 200
      }

    );






  }
  catch(error:any){


    console.log(
      "UPLOAD ERROR 👉",
      error
    );



    return NextResponse.json(

      {
        message: error.message
      },

      {
        status:500
      }

    );


  }


}