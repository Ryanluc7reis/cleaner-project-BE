import Rating from './rating.model'

export const createRating = async (body, fullName) => {
  return await Rating.create({   
    forCleaner: body.forCleaner,
    nameRequester: fullName,
    stars: body.stars
  
  })
}