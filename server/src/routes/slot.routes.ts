import { Router } from 'express';
import { body } from 'express-validator';
import { createSlotController, getSlotsController } from '../controllers/slot.controller';

const router = Router();

router.post('/all', getSlotsController);

router.post(
  '/',
  [
    body('startTime').isISO8601().toDate(),
    body('endTime').isISO8601().toDate(),
    body('capacity').isInt({ min: 1 }),
    body('price').isFloat({ min: 0 }),
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('venue').notEmpty(),
  ],
  createSlotController
);

export default router;
