import Service from './service.model'
import User from '../user/user.model'

export const createService = async (body, fullName) => {
  try{
    const cleaner = await User.findOne({ fullName: body.cleaner})
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
      address: body.address,
      number: body.number,
      requester: fullName,
      cleaner: body.cleaner
    })
    return service
  } catch (err){
    throw err
  }
 
}
export const getServicesCleaner = async (fullName) => {
  try {
    const service = await Service.findOne({ cleaner: fullName })
    if (!service ) {
      throw new Error('Serviço não encontrado');
    }
    if (fullName && fullName !== service.cleaner) {
      
      throw new Error('Serviço não encontrado');
    } else {
    
     return service
    }
  } catch (err) {
    throw err
  }
 
}
export const getServicesUser = async (fullName) => {
  try {
    const service = await Service.findOne({ requester: fullName })
    if (!service ) {
      throw new Error('Serviço não encontrado');
    }
    if (fullName && fullName !== service.requester) {
      
      throw new Error('Serviço não encontrado');
    } else {
    
     return service
    }
  } catch (err) {
    throw err
  }
 
}

