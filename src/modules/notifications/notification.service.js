import Notification from './notification.model'

export const createNotification = async (body) => {
  return await Notification.create({   
    for: body.for,
    notificationType: body.notificationType
  
  })
}