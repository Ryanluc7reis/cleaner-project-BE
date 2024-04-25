import Historic from './historic.model'
import User from '../user/user.model'

export const createHistoric = async (body) => {
  return await Historic.create({   
    for: body.for,
    historicType: body.historicType,
    createdDate: new Date()
  
  })
}
