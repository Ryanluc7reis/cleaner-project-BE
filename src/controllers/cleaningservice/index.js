import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import { createService, getServicesCleaner, getServicesUser } from '../../modules/cleaningservices/service.service';
import { createServiceSchema } from '../../modules/cleaningservices/service.schema';
import { verifyToken } from '../../../utils/auth';


const router = Router();

router.post('/createService',verifyToken, celebrate({ [Segments.BODY]: createServiceSchema }), async (req, res) => {
    try {     
        const newService = await createService(req.body, req.fullName)
        res.status(201).send(newService)
      } catch (err) {
        res.status(400).send(err.message)
     
      }
      
});
router.get('/getService-cleaner', verifyToken,  async (req, res) => {
  try {     
      const service = await getServicesCleaner(req.fullName)
      res.status(200).send(service)
    } catch (err) {
      res.status(400).send({message: 'Serviço não encontrado'})
   
    }
    
});
router.get('/getService-user', verifyToken,  async (req, res) => {
  try {     
      const service = await getServicesUser(req.fullName)
      res.status(200).send(service)
    } catch (err) {
      res.status(400).send({message: 'Serviço não encontrado'})
   
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