import Notification from './notification.model'

export const createNotification = async (body) => {
  return await Notification.create({   
    for: body.for,
    notificationType: body.notificationType,
    createdDate: new Date(),
    read: false,
    type: 'normal',
    cleaner : 'false'
  
  })
}
export const createNotificationToRating = async (body, fullName) => {
  return await Notification.create({   
    for: body.for,
    notificationType: ` O cleaner ${fullName} finalizou o serviço`,
    createdDate: new Date(),
    read: false,
    type: 'rating',
    cleaner: fullName
  
  })
}
export const getNotifications = async (fullName) => {
  try {
    const user = await Notification.findOne(
      {
        for: fullName ,
        type: 'normal'
      }
    )
    if(!user){
      throw new Error('notification not found')
    }
    if ( fullName && fullName !== user.for) {
      throw new Error('user not found')
    } 
    const notifications = await Notification.find({ for: fullName, type: 'normal' }).sort({ createdDate: -1 })
       if (!notifications ) {
      throw new Error('nenhuma notification encontrada');
    }
     return notifications
    
  } catch (err) {
    throw err
  }
}
export const getOneNotificationRating = async ( fullName) => {
  try {
    const user = await Notification.findOne(
      {
        for: fullName ,
        type: 'rating',
     
      }
    )
    if(!user){
      throw new Error('notification not found')
    }
    if ( fullName && fullName !== user.for) {
      throw new Error('user not found')
    } 
    const notification = await Notification.findOne({ for: fullName, type: 'rating' , read: false })
       if (!notification ) {
      throw new Error('nenhuma notification encontrada');
    }
     return notification
    
  } catch (err) {
    throw err
  }
}
export const getNotificationsCount  = async (fullName) => {
  try{
    const user = await Notification.findOne(
      {
        for: fullName ,
        type: 'normal'
      }
    )
    if(!user){
      throw new Error('notification not found')
    }
    if (fullName && fullName !== user.for) {
      throw new Error('user not found')
    } 
    

    const notificationsCount = await Notification.countDocuments(
      { 
        for: fullName, 
        read: false, 
        type: 'normal'

      }
    );
    if (!notificationsCount ) {
      throw new Error('nenhuma notification encontrada');
  }
  
    return notificationsCount;
  } catch(err) {
    throw err
  }
}

export const editAllNotificationsAsRead = async (fullName) => {
  try {
    const user = await Notification.findOne(
      {
        for: fullName 
      }
    )
    if (fullName && fullName !== user.for) {
      throw new Error('user not found')
    } 
    
    const result = await Notification.updateMany({ for: fullName }, { read: true });

    if (result.nModified === 0 ) {
      throw new Error('Nenhuma notificação encontrada para atualizar');
    }

    return result;
  } catch (err) {
    throw err;
  }
};
export const deleteNotification = async (id) => {
  return await Notification.findOneAndDelete({
    _id: id
  })
}

