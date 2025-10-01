import { Router } from "express";
import { userController } from "./user.controller";

export const router = Router()

router.get('/users', userController.getAll)
router.get('/users:id', userController.getById)
router.post('/users', userController.addUser)
router.put('/users:id', userController.updateUser)
router.delete('/users:id', userController.deleteUser)