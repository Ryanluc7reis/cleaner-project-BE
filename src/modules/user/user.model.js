 import mongoose from 'mongoose';

 const UserSchema = new mongoose.Schema({   
   fullName: { type: String, required: true, maxlength: 50 },
   user: { type: String, required: true, maxlength: 30, unique: true },
   email: { type: String, required: true, maxlength: 100, unique: true },
   password: { type: String, required: true },
   address: { type: String, required: true, maxlength: 100 }, 
   number: { type: Number, required: true, maxlength: 70 } ,
   userType: { type: String, required: true }
 });

 export default mongoose.models.User || mongoose.model('User', UserSchema);
 