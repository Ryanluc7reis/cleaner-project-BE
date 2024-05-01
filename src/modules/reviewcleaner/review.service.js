import Review from './review.model'

export const createReview = async (body, fullName) => {
  return await Review.create({   
    forCleaner: body.forCleaner,
    nameRequester: fullName,
    createdDate: new Date(),
    text: body.text
  
  })
}