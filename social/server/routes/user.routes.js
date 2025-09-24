import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { getCurrentUser, getProfile } from '../controllers/user.controllers.js';

const userRouter = express.Router()

userRouter.get('/current' ,isAuth , getCurrentUser )
userRouter.get('/getprofile/:userName' , getProfile )

export default userRouter