import Card from './card.model'

export const createCard = async (body, user) => {
  return await Card.create({   
    name: body.name,
    price: body.price,
    rating: '-',
    experience: body.experience,
    amountCleaning: body.amountCleaning,
    region: body.region,
    about: body.about,
    cleaning: body.cleaning,
    cleaning2: body.cleaning2,
    cleaning3: body.cleaning3,
    creator: user
  })
}
export const findOneCard = async (user) => {
  return await Card.findOne({
    creator: user
  })
}
export const getOneCard = async (body) => {
  return await Card.findOne({
    _id: body.id
  })
}
export const getCards = async (limit = 10) => {
  return await Card.find().limit(limit)
}
export const editCard = async (body, user) => {
  return await Card.findOneAndUpdate({
    _id: body.id,
    creator: user

  },{
    name: body.name,
    price: body.price,
    experience: body.experience,
    amountCleaning: body.amountCleaning,
    region: body.region,
    about: body.about,
    cleaning: body.cleaning,
    cleaning2: body.cleaning2,
    cleaning3: body.cleaning3,
  },{
    new: true 
  })
}