import { Router } from "express";
import { userController } from "./user.controller";
import { requireAuth } from "../../middleware/auth";

export const userRouter = Router()

//remove requireRole & requireAuth because i wanna access all users for signup and signin to check email & password
userRouter.get('/', userController.getAll)

userRouter.get('/:id', requireAuth, userController.getById)
userRouter.post('/', requireAuth, userController.addUser)
userRouter.put('/:id', requireAuth, userController.updateUser)
userRouter.delete('/:id', requireAuth, userController.deleteUser)