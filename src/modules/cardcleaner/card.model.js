import mongoose from 'mongoose';
import User from '../user/user.model'

const CardSchema = new mongoose.Schema({ 
    name: { type: String, required: true }, 
    price: { type: String, required: true },
    rating: { type: String, required: true },
    experience: { type: String, required: true },
    amountCleaning : { type: Number, required: true },
    creator: { type: String, required: true, ref: User }
});

export default mongoose.models.Card || mongoose.model('Card', CardSchema);

