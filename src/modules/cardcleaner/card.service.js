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
    creator: user,
    scheduleBlocked: false,
    availableDate: '-'
  })
}
export const findOneCard = async (user) => {
  return await Card.findOne({
    creator: user
  })
}
export const getOneCard = async (body) => {
  return await Card.findOne({
    $or: [
      { _id: body.id },
      { _id: body.cardId },
      {creator: body.cleaner}
    ]
  });
};

export const getCards = async (body) => {
  try {
    let dateString; 

    if (body.date !== undefined && body.date !== null) {
      dateString = body.date.toString();
    } else {
      throw new Error('body.date não é uma string');
    }

    const card = await Card.findOne({
      scheduleBlocked: false,
      $or : [{availableDate: { $regex: dateString }}, { availableDate : '-' }]
    });

    if (!card) {
      throw new Error('card not found');
    }
  
    const cards = await Card.find(
      { 
        scheduleBlocked: false,
         $or : [{availableDate: { $regex: dateString }}, { availableDate : '-' }] });
    if (!cards){
      throw new Error('nenhum card encontrado');
    }
    return cards;
  } catch (err){
    throw err;
  }
};

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
export const editamountCleaningCard = async (body) => {
  return await Card.findOneAndUpdate({
    _id: body.id,
    creator: body.creator

  },{
    amountCleaning: body.amountCleaning,
  },{
    new: true 
  })
}
export const editRatingCard = async (body) => {
  return await Card.findOneAndUpdate({
    _id: body.id,
    creator: body.creator

  },{
    rating: body.rating,
    
  },{
    new: true 
  })
}
export const editScheduleCleaner = async (user, body) => {
  try{
    const dateCurrent = await Card.findOne({ creator: user });
  
    if (!dateCurrent) {
      throw new Error('card não encontrado');
    }
    if (body.availableDate && body.availableDate !== dateCurrent.availableDate) {
      
      body.availableDate 
    } else {
    
      body.availableDate= dateCurrent.availableDate
    }

    const card = await Card.findOneAndUpdate({
      creator: user
  
    },{
      scheduleBlocked: body.scheduleBlocked,
      availableDate: body.availableDate
      
    },{
      new: true 
    })
    return card
  }
  catch (err){
    throw err
  }
  
}
export const editScheduleBlockedCleaner = async (user, body) => {
  try{
    const dateCurrent = await Card.findOne({ creator: user });
  
    if (!dateCurrent) {
      throw new Error('card não encontrado');
    }

    const card = await Card.findOneAndUpdate({
      creator: user
  
    },{
      scheduleBlocked: body.scheduleBlocked
      
    },{
      new: true 
    })
    return card
  }
  catch (err){
    throw err
  }
  
}