import express from 'express'
import { CoachController } from './coach.controller'
import isAuth from '../../middleware/isAuth'
const router = express.Router()


router.get('/', CoachController.getCoaches)
router.get('/:id', CoachController.getCoach)
router.post('/', CoachController.createNewCoach)
router.patch('/:id', CoachController.updateCoach)
router.patch('/book/:id/', isAuth, CoachController.bookSeat)
router.patch('/unBook/:id/', CoachController.unBookSeat)
router.delete('/:id', CoachController.deleteCoach)


export const CoachRoute = router