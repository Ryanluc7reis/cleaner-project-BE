import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import
{ 
  createService,
  createServiceAccepted,
  getServicesCleaner,
  getServicesUser,
  getServicesCleanerAccepteds,
  getServicesUserAccepteds,
  deleteService
} from '../../modules/cleaningservices/service.service';
import { createServiceSchema, createServiceAcceptedSchema, deleteServiceSchema } from '../../modules/cleaningservices/service.schema';
import { verifyToken } from '../../../utils/auth';


const router = Router();

router.post('/createService',verifyToken, celebrate({ [Segments.BODY]: createServiceSchema }), async (req, res) => {
    try {     
        const newService = await createService(req.body, req.fullName)
        if (newService) return res.status(201).send(newService)

        return res.status(400).send('service not created')
      } catch (err) {
        res.status(500).send(err.message)
     
      }
      
});
router.post('/createServiceAccepted',verifyToken, celebrate({ [Segments.BODY]: createServiceAcceptedSchema }), async (req, res) => {
  try {     
      const newServiceAccepted = await createServiceAccepted(req.body, req.fullName)
      if (newServiceAccepted) return res.status(201).send(newServiceAccepted)

      return res.status(400).send('service not created')
    } catch (err) {
      res.status(500).send(err.message)
   
    }
   
});
router.get('/getServiceAccepted-cleaner', verifyToken,  async (req, res) => {
  try {     
      const service = await getServicesCleanerAccepteds(req.fullName)
      if (service) return res.status(200).send(service)

     return res.status(400).send('service not found')
    } catch (err) {
      res.status(500).send(err.message)
   
    }
    
});
router.get('/getServiceAccepted-user', verifyToken,  async (req, res) => {
  try {     
      const service = await getServicesUserAccepteds(req.fullName)
      if (service) return res.status(200).send(service)

     return res.status(400).send('service not found')
    } catch (err) {
      res.status(500).send(err.message)
   
    }
    
});
router.get('/getService-cleaner', verifyToken,  async (req, res) => {
  try {     
      const service = await getServicesCleaner(req.fullName)
      if (service) return res.status(200).send(service)

      return res.status(400).send('service not found')
    } catch (err) {
      res.status(500).send(err.message)
   
    }
    
});
router.get('/getService-user', verifyToken,  async (req, res) => {
  try {     
      const service = await getServicesUser(req.fullName)
      if (service) return res.status(200).send(service)

      return res.status(400).send('service not found')
    } catch (err) {
      res.status(500).send(err.message)
   
    }
    
});
router.delete('/deleteService', verifyToken, celebrate({ [Segments.BODY]: deleteServiceSchema }),  async (req, res) => {
  try {     
    const deletedCard = await deleteService(req.body.id)
    if (deletedCard) return res.status(200).send({ ok: true })

    return res.status(400).send('service not found')
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