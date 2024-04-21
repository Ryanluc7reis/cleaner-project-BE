import Service from './service.model'
import User from '../user/user.model'

export const createService = async (body, user) => {
  try{
    const cleaner = await User.findOne({ user: body.cleaner})
    if (!cleaner) {
      throw new Error('Cleaner não encontrado');
    }
    const service =  await  Service.create({   
      plan: body.plan, 
      duration: body.duration,
      startingTime: body.startingTime,
      totalCost : body.totalCost,
      createdDate: new Date(),
      serviceDate: body.serviceDate,
      requester: user,
      cleaner: body.cleaner
    })
    return service
  } catch (err){
    throw err
  }
 
}
export const getServicesCleaner = async (user) => {
  try {
    const service = await Service.findOne({ cleaner: user })
    if (!service ) {
      throw new Error('Serviço não encontrado');
    }
    if (user && user !== service.cleaner) {
      
      throw new Error('Serviço não encontrado');
    } else {
    
     return service
    }
  } catch (err) {
    throw err
  }
 
}
export const getServicesUser = async (user) => {
  try {
    const service = await Service.findOne({ requester: user })
    if (!service ) {
      throw new Error('Serviço não encontrado');
    }
    if (user && user !== service.requester) {
      
      throw new Error('Serviço não encontrado');
    } else {
    
     return service
    }
  } catch (err) {
    throw err
  }
 
}

