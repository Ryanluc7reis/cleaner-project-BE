import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import { createReview } from '../../modules/reviewcleaner/review.service';
import { createReviewSchema} from '../../modules/reviewcleaner/review.schema';
import { verifyToken } from '../../../utils/auth';


const router = Router();

router.post('/createReview',verifyToken, celebrate({ [Segments.BODY]: createReviewSchema }), async (req, res) => {
    try {     
        const newReview = await createReview(req.body, req.fullName)
        if (newReview) return res.status(201).send(newReview)

        return res.status(400).send('review not created')
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