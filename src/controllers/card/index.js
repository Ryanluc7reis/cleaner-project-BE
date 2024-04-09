import { Router } from 'express';
import { celebrate } from 'celebrate';

import { createCard, findOneCard, getCards } from '../../modules/cardcleaner/card.service';
import { createCardSchema } from '../../modules/cardcleaner/card.schema';
import { verifyToken } from '../../../utils/auth';


const router = Router();

router.post('/createCard',verifyToken, celebrate({ body: createCardSchema }), async (req, res) => {
    try {     
        const newCard = await createCard(req.body, req.user)
        res.status(201).send(newCard)
      } catch (err) {
        res.status(400).send(err.message)
      }
});
router.get('/findCard',verifyToken,  async (req, res) => {
  try {     
      const card = await findOneCard( req.user)
      res.status(200).send(card)
    } catch (err) {
      res.status(400).send(err.message)
    }
});
router.get('/getCards',async (req, res) => {
  try {
    const cards = await getCards()
    res.status(200).send(cards)
  } catch (err) {
    return res.status(500).send(err.message)
  }
})


export default router;
