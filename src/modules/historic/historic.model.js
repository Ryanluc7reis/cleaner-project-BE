import mongoose from 'mongoose';


const HistoricSchema = new mongoose.Schema({ 

    for: { type: String, required: true },
    historicType: { type: String, required: true },
    createdDate: { type: Date, required: true }
    
});

export default mongoose.models.Historic || mongoose.model('Historic', HistoricSchema);

