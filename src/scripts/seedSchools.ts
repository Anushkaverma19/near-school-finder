import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import connectDB from "@/lib/mongoose";
import School from "@/models/School";
import { schools } from "@/data/schools";

async function seedSchools() {
  try {
    await connectDB();

    console.log("MongoDB Connected");

    await School.deleteMany();

    console.log("Old schools removed");

    const result = await School.insertMany(schools);

    console.log(`${result.length} schools inserted successfully`);

    process.exit(0);

  } catch (error) {
    console.log("Seed Error:", error);
    process.exit(1);
  }
}

seedSchools();