import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.get('/', userController.getAllUser)
router.get('/:email', userController.getSingleUser)
router.patch('/:email', userController.updateUserInfo)
router.delete('/:email', userController.deleteUser)

export const userRoute = router