import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;


if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI in .env");
}


interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}


const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};



let cached: MongooseCache = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};



globalWithMongoose.mongoose = cached;



async function connectDB() {


  if (cached.conn) {
    return cached.conn;
  }



  if (!cached.promise) {

    cached.promise = mongoose.connect(MONGODB_URI);

  }



  cached.conn = await cached.promise;


  return cached.conn;

}



export default connectDB;