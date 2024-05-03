import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import { createRating, getRatings } from '../../modules/ratingcleaner/rating.service';
import { createRatingSchema} from '../../modules/ratingcleaner/rating.schema';
import { verifyToken } from '../../../utils/auth';


const router = Router();

router.post('/createRating', verifyToken, celebrate({ [Segments.BODY]: createRatingSchema }), async (req, res) => {
    try {     
        const newRating = await createRating(req.body, req.fullName)
        if (newRating) return res.status(201).send(newRating)

        return res.status(400).send('rating not created')
      } catch (err) {
        res.status(500).send(err.message)
     
      }    
});
router.post('/getRatings', async (req, res) => {
  try {     
      const ratings = await getRatings(req.body)
      if (ratings) return res.status(200).send(ratings)

      return res.status(400).send('ratings not found')
    } catch (err) {
      res.status(500).send(err.message)
   
    }    
});
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
  export default router