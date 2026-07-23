import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import School from "@/models/School";
import { haversineDistance } from "@/utils/haversine";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const lat = Number(req.nextUrl.searchParams.get("lat"));
    const lng = Number(req.nextUrl.searchParams.get("lng"));

    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json(
        {
          error: "Latitude and Longitude are required",
        },
        {
          status: 400,
        }
      );
    }

    const schools = await School.find().lean();

    const nearbySchools = schools
      .filter((school: any) => {
        if (
          school.latitude == null ||
          school.longitude == null
        ) {
          return false;
        }

        const distance = haversineDistance(
          lat,
          lng,
          school.latitude,
          school.longitude
        );

        console.log(
  school.name,
  distance.toFixed(2),
  "km"
);
        return distance <= 20; // 20 KM radius
      })
      .map((school: any) => ({
        ...school,
        distance: haversineDistance(
          lat,
          lng,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a: any, b: any) => a.distance - b.distance);

    return NextResponse.json(nearbySchools);
  } catch (error) {
    console.error("Nearby School Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch nearby schools",
      },
      {
        status: 500,
      }
    );
  }
}