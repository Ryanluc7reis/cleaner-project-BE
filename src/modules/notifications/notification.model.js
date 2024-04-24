import mongoose from 'mongoose';


const NotificationSchema = new mongoose.Schema({ 

    for: { type: String, required: true },
    notificationType: { type: String, required: true },
    createdDate: { type: Date, required: true }
    
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

