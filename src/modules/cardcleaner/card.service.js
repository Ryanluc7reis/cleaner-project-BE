import Card from './card.model'

export const createCard = async (body, user) => {
  return await Card.create({   
    name: body.name,
    price: body.price,
    rating: '-',
    experience: body.experience,
    amountCleaning: body.amountCleaning,
    region: body.region,
    creator: user
  })
}
export const findOneCard = async (user) => {
  return await Card.findOne({
    creator: user
  })
}
export const getCards = async (limit = 10) => {
  return await Card.find().limit(limit)
}