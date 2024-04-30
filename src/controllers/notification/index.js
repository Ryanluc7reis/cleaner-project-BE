import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import { createNotification, getNotifications, deleteNotification, getNotificationsCount, editAllNotificationsAsRead } from '../../modules/notifications/notification.service';
import { createNotificationSchema, deleteNotificationSchema } from '../../modules/notifications/notification.schema';
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
router.get('/getNotifications', verifyToken,  async (req, res) => {
  try {     
      const notifications = await getNotifications(req.fullName)
      if (notifications) return res.status(200).send(notifications)

      return res.status(400).send('notification not found')
    } catch (err) {
      res.status(500).send(err.message)
   
    }    
});
router.get('/getNotificationsCount', verifyToken,  async (req, res) => {
  try {     
      const notifications = await getNotificationsCount(req.fullName)
      if (notifications) return res.status(200).json({count: notifications})
      
      return res.status(400).send('notification not found')
    } catch (err) {
      res.status(500).send(err.message)
   
    }    
});
router.get('/notificationsAsRead', verifyToken, async (req, res) => {
  try {
    const result = await editAllNotificationsAsRead(req.fullName);
    res.status(200).json({ message: 'Todas as notificações foram marcadas como lidas', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/deleteNotification', verifyToken, celebrate({ [Segments.BODY]: deleteNotificationSchema }),  async (req, res) => {
  try {     
    const deletedNotification = await deleteNotification(req.body.id)
    if (deletedNotification) return res.status(200).send({ ok: true })

    return res.status(400).send('notification not found')
    } catch (err) {
      res.status(500).send(err.message)
    }
    
});
router.use((err, req, res, next) => {
  if (err.joi) {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.joi.details.map(detail => detail.message)
    });
  }
  console.error(err);
  res.status(500).send('Erro interno do servidor');
});
export default router