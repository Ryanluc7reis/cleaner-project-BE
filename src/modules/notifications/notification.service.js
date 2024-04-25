import Notification from './notification.model'

export const createNotification = async (body) => {
  return await Notification.create({   
    for: body.for,
    notificationType: body.notificationType,
    createdDate: new Date()
  
  })
}
export const getNotifications = async (fullName) => {
  try {
    const user = await Notification.findOne(
      {
        for: fullName 
      }
    )
    if ( fullName && fullName !== user.for) {
      throw new Error('user not found')
    } 
    const notifications = await Notification.find({ for: fullName }).sort({ createdDate: -1 })
       if (!notifications ) {
      throw new Error('nenhuma notification encontrada');
    }
     return notifications
    
  } catch (err) {
    throw err
  }
}
export const deleteNotification = async (id) => {
  return await Notification.findOneAndDelete({
    _id: id
  })
}
