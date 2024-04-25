import Historic from './historic.model'


export const createHistoric = async (body) => {
  return await Historic.create({   
    for: body.for,
    historicType: body.historicType,
    createdDate: new Date()
  
  })
}
export const getHistorics = async (fullName) => {
  try {
    const user = await Historic.findOne(
      {
        for: fullName 
      }
    )
    if ( fullName && fullName !== user.for) {
      throw new Error('user not found')
    } 
    const historics = await Historic.find({ for: fullName }).sort({ createdDate: -1 })
       if (!historics ) {
      throw new Error('nenhuma historico encontrada');
    }
     return historics
    
  } catch (err) {
    throw err
  }
}

