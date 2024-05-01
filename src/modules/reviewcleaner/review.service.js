import Review from './review.model'

export const createReview = async (body, fullName) => {
  return await Review.create({   
    forCleaner: body.forCleaner,
    nameRequester: fullName,
    createdDate: new Date(),
    text: body.text
  
  })
}
export const getReviews = async (body) => {
  try {
    const review = await Review.findOne(
      {
        forCleaner: body.forCleaner 
      }
    )
    if ( body.forCleaner  && body.forCleaner  !== review.forCleaner) {
      throw new Error('review not found')
    } 
    const reviews = await Review.find({ forCleaner: body.forCleaner  }).sort({ createdDate: -1 })
       if (!reviews ) {
      throw new Error('nenhum review encontrado');
    }
     return reviews
    
  } catch (err) {
    throw err
  }
}