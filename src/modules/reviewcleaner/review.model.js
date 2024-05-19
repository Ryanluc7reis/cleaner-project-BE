import mongoose from 'mongoose';


const ReviewSchema = new mongoose.Schema({
    forCleaner: { type: String, required: true },
    nameRequester: { type: String, required: true },
    createdDate: { type: Date, required: true },
    text: { type: String, required: true  } 
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
