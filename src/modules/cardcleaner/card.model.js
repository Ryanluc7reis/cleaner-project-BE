import mongoose from 'mongoose';


const CardSchema = new mongoose.Schema({ 
    name: { type: String, required: true }, 
    price: { type: String, required: true },
    rating: { type: String, required: true },
    experience: { type: String, required: true },
    amountCleaning : { type: Number, required: true },
    region : { type: String, required: true },
    about: { type: String, required: true },
    cleaning: { type: String, required: true },
    cleaning2: { type: String, required: true },
    cleaning3: { type: String, required: true },
    creator: { type: String, required: true }
});

export default mongoose.models.Card || mongoose.model('Card', CardSchema);

