import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import { createHistoric, getHistorics } from '../../modules/historic/historic.service';
import { createHistoricSchema } from '../../modules/historic/historic.schema';
import { verifyToken } from '../../../utils/auth';


const router = Router();

router.post('/createHistoric', verifyToken, celebrate({ [Segments.BODY]: createHistoricSchema }), async (req, res) => {
    try {     
        const newHistoric = await createHistoric(req.body)
        if (newHistoric) return res.status(201).send(newHistoric)

        return res.status(400).send('historic not created')
      } catch (err) {
        res.status(500).send(err.message)
     
      }    
});
router.get('/getHistorics', verifyToken,  async (req, res) => {
  try {     
      const historics = await getHistorics(req.fullName)
      if (historics) return res.status(200).send(historics)

      return res.status(400).send('historics not found')
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