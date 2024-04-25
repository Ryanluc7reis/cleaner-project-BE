import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({ 
    plan: { type: String, required: true }, 
    duration: { type: String, required: true },
    startingTime: { type: String, required: true },
    totalCost : { type: String, required: true },
    createdDate: { type: Date, required: true },
    serviceDate: { type: String, required: true },
    address: { type: String, required: true },
    number: { type: String, required: true },
    requester: { type: String, required: true },
    cleaner: { type: String, required: true },
    stateService: { type: String, required: true }
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);

