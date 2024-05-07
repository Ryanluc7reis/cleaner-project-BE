import { required } from 'joi';
import mongoose from 'mongoose';


const NotificationSchema = new mongoose.Schema({
    for: { type: String, required: true },
    notificationType: { type: String, required: true },
    createdDate: { type: Date, required: true },
    read: { type: Boolean, default: false } ,
    type: { type: String, required: true } ,
    cleaner: { type: String, required: true } 
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
