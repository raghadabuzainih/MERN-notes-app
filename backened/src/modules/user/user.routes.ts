import { Router } from "express";
import { userController } from "./user.controller";
import { requireAuth, requireRole } from "../../middleware/auth";

export const userRouter = Router()

userRouter.get('/',requireRole(['admin']), userController.getAll)
userRouter.get('/:id', userController.getById)
userRouter.post('/', userController.addUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)