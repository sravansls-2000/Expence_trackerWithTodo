import {
  registerUser,
  fetchUsersCtrl,
  loginUserCtrl,
} from '../controllers/userController.js';

import express from 'express';

const userRoute = express.Router();

userRoute.post('/rigister', registerUser);
userRoute.get('/allUsers', fetchUsersCtrl);
userRoute.post('/login', loginUserCtrl);

export default userRoute;
