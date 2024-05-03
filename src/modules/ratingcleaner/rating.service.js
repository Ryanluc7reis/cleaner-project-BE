import Rating from './rating.model'

export const createRating = async (body, fullName) => {
  return await Rating.create({   
    forCleaner: body.forCleaner,
    nameRequester: fullName,
    stars: body.stars
  })
}
export const getRatings = async (body) => {
  try {
    const rating = await Rating.findOne(
      {
        forCleaner: body.forCleaner 
      }
    )
    if ( body.forCleaner  && body.forCleaner  !== rating.forCleaner) {
      throw new Error('rating not found')
    } 
    const ratings = await Rating.find({ forCleaner: body.forCleaner  })
       if (!ratings ) {
      throw new Error('nenhum rating encontrado');
    }
     return ratings
    
  } catch (err) {
    throw err
  }
}