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
      cleaner: body.cleaner,
      stateService: 'pending'
    })
    return service
  } catch (err){
    throw err
  }
}
export const createServiceAccepted = async (body) => {
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
      requester: body.requester,
      cleaner: body.cleaner,
      stateService: 'accepted'
    })
    return service
  } catch (err){
    throw err
  }
}

export const getServicesCleaner = async (fullName,limit = 10) => {
  try {
    const cleaner = await Service.findOne(
      {
        cleaner: fullName,
        stateService: 'pending'
      }
    )
    if ( fullName && fullName !== cleaner.cleaner) {
      throw new Error('cleaner not found')
    } 

  
    const services = await Service.find(
      {
        cleaner: fullName,
        stateService: 'pending'
      }
    ).sort({ createdDate: -1 }).limit(limit)
       if (!services ) {
      throw new Error('nenhum serviço não encontrado');
    }
     return services
    
  } catch (err) {
    throw err
  }
}
export const getServicesUser = async (fullName,limit = 10) => {
  try {
    const user = await Service.findOne(
      {
        requester: fullName,
        stateService: 'pending'
      }
    )
    if ( fullName && fullName !== user.requester) {
      throw new Error('user not found')
    } 

  
    const service = await Service.find(
      { 
        requester: fullName ,
        stateService: 'pending'
      }
    ).sort({ createdDate: -1 }).limit(limit)
    if (!service ) {
      throw new Error('nenhum serviço não encontrado');
    }
     return service
   
  } catch (err) {
    throw err
  }
 
}
export const getServicesCleanerAccepteds = async (fullName,limit = 10) => {
  try {
    const cleaner = await Service.findOne(
      {
        cleaner: fullName,
        stateService: 'accepted'
      }
    )
    if ( fullName && fullName !== cleaner.cleaner) {
      throw new Error('cleaner not found')
    } 

   
    const services = await Service.find(
      { 
        cleaner: fullName ,
        stateService: 'accepted'
      }
    ).sort({ createdDate: -1 }).limit(limit)
    if (!services ) {
      throw new Error('nenhum serviço não encontrado');
    }
     return services
    
  } catch (err) {
    throw err
  }
}
export const getServicesUserAccepteds = async (fullName, limit= 10) => {
  try {
     const user = await Service.findOne(
       {
         requester: fullName,
         stateService: 'accepted'
       }
     )
     if ( fullName && fullName !== user.requester) {
       throw new Error('user not found')
     } 

   
    const services = await Service.find(
      { 
        requester: fullName ,
        stateService: 'accepted'
      }
    ).sort({ createdDate: -1 }).limit(limit)
    if (!services ) {
      throw new Error('nenhum serviço não encontrado');
    } 
     return services
    
  } catch (err) {
    throw err
  }
}
export const deleteService = async (id) => {
  return await Service.findOneAndDelete({
    _id: id
  })
}


