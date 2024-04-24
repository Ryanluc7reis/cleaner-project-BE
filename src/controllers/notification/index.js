import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import { createNotification } from '../../modules/notifications/notification.service';
import { createNotificationSchema } from '../../modules/notifications/notification.schema';
import { verifyToken } from '../../../utils/auth';


const router = Router();

router.post('/createNotification',verifyToken, celebrate({ [Segments.BODY]: createNotificationSchema }), async (req, res) => {
    try {     
        const newNotification = await createNotification(req.body)
        if (newNotification) return res.status(201).send(newNotification)

        return res.status(400).send('service not created')
      } catch (err) {
        res.status(500).send(err.message)
     
      }    
});
export default router