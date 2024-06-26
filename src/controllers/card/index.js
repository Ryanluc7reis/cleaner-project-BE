import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import { 
  createCard,
  findOneCard,
  getCards,
  getOneCard,
  editCard,
  editRatingCard,
  editamountCleaningCard,
  editScheduleCleaner,
  editScheduleBlockedCleaner 
} from '../../modules/cardcleaner/card.service';
import { 
  createCardSchema,
  editCardSchema,
  editRatingCardSchema,
  editamountCleaningCardSchema,
  editScheduleCleanerSchema,
  editScheduleBlockedSchema
} from '../../modules/cardcleaner/card.schema';
import { verifyToken } from '../../../utils/auth';


const router = Router();

router.post('/createCard',verifyToken, celebrate({ [Segments.BODY]: createCardSchema }), async (req, res) => {
    try {     
        const newCard = await createCard(req.body, req.user)
        res.status(201).send(newCard)
      } catch (err) {
        res.status(400).send(err.message)
        next(err)
      }
      
});
router.patch('/editCard',verifyToken, celebrate({ [Segments.BODY]: editCardSchema }), async (req, res) => {
  try {
    
    const refreshCard = await editCard(req.body, req.user)
    if (refreshCard) return res.status(200).send(refreshCard)

    return res.status(400).send('card not found')
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
router.patch('/editRatingCard',verifyToken, celebrate({ [Segments.BODY]: editRatingCardSchema }), async (req, res) => {
  try {
    
    const refreshCard = await editRatingCard(req.body)
    if (refreshCard) return res.status(200).send(refreshCard)

    return res.status(400).send('card not found')
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
router.patch('/editamountCleaningCard',verifyToken, celebrate({ [Segments.BODY]: editamountCleaningCardSchema }), async (req, res) => {
  try {
    
    const refreshCard = await editamountCleaningCard(req.body)
    if (refreshCard) return res.status(200).send(refreshCard)

    return res.status(400).send('card not found')
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
router.patch('/editScheduleCleaner',verifyToken, celebrate({ [Segments.BODY]: editScheduleCleanerSchema }), async (req, res) => {
  try {
    
    const refreshCard = await editScheduleCleaner(req.user, req.body)
    if (refreshCard) return res.status(200).send(refreshCard)

    return res.status(400).send('card not found')
  } catch (err) {
    return res.status(500).send(err.message)
  }
})

router.patch('/editScheduleBlockedCleaner',verifyToken, celebrate({ [Segments.BODY]: editScheduleBlockedSchema }), async (req, res) => {
  try {
    
    const refreshCard = await editScheduleBlockedCleaner(req.user, req.body)
    if (refreshCard) return res.status(200).send(refreshCard)

    return res.status(400).send('card not found')
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
router.get('/findCard',verifyToken,  async (req, res) => {
  try {     
      const card = await findOneCard(req.user)
      res.status(200).send(card)
    } catch (err) {
      res.status(400).send(err.message)
    }
});
router.get('/getOneCard', async (req, res) => {
  try {
    const card = await getOneCard({ id: req.query.id, cardId: req.query.cardId, cleaner : req.query.cleaner });
    res.status(200).send(card);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/getCards', async (req, res) => {
  try {
    const cards = await getCards(req.body)
    res.status(200).send(cards)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})
router.use((err, req, res, next) => {
  if (err.joi) {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.joi.details.map(detail => detail.message)
    });
  }
  console.error(err);
  res.status(500).send('Erro interno do servidor');
});

export default router;
