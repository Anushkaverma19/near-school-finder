import mongoose,{Schema,models} from "mongoose";


const FavoriteSchema = new Schema({

 userEmail:{
   type:String,
   required:true
 },


 schoolId:{
   type:String,
   required:true
 },


 schoolName:{
   type:String,
   required:true
 },


 image:{
   type:String
 },


 address:{
   type:String
 }

},
{
 timestamps:true
});


export default models.Favorite ||
mongoose.model("Favorite",FavoriteSchema);