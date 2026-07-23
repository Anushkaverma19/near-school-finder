import mongoose, { Schema, models, model } from "mongoose";


const ReviewSchema = new Schema(
{
  school:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"School",
    required:true
  },


  username:{
    type:String,
    required:true
  },


  rating:{
    type:Number,
    required:true
  },


  comment:{
    type:String,
    required:true
  }

},
{
  timestamps:true
}
);


export default models.Review || model("Review", ReviewSchema);