import express from 'express'
import { userController } from './user.controller'
import isAuth from '../../middleware/isAuth'

const router = express.Router()

router.get('/', userController.getAllUser)
router.get('/me',isAuth, userController.getSingleUser)
router.patch('/:email', userController.updateUserInfo)
router.delete('/:email', userController.deleteUser)

export const userRoute = router