import mongoose,{Schema,models,model} from "mongoose";


const SchoolSchema = new Schema({

name:{
 type:String,
 required:true
},


address:{
 type:String,
 required:true
},


city:{
 type:String
},


state:{
 type:String
},


country:{
 type:String
},


board:{
 type:String
},


phone:{
 type:String
},


email:{
 type:String
},


website:{
 type:String
},


description:{
 type:String
},


image:{
 type:String
},


latitude:{
 type:Number
},


longitude:{
 type:Number
},
location: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
    default: [0, 0], // [longitude, latitude]
  },
},

rating:{
 type:Number,
 default:4.5
},


createdBy:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User",
 required:false
},


reviews:[
{
 type:mongoose.Schema.Types.ObjectId,
 ref:"Review"
}
]


},
{
timestamps:true
});


export default models.School || model("School",SchoolSchema);