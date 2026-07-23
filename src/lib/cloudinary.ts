import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.ping()
  .then((res) => console.log("CLOUDINARY PING SUCCESS", res))
  .catch((err) => console.log("CLOUDINARY PING ERROR", err));

export default cloudinary;