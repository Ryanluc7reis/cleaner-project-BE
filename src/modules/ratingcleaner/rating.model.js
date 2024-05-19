import mongoose from 'mongoose';


const RatingSchema = new mongoose.Schema({
    forCleaner: { type: String, required: true },
    nameRequester: { type: String, required: true },
    stars: { type: Number, required: true  } 
});

export default mongoose.models.Rating || mongoose.model('Rating', RatingSchema);
