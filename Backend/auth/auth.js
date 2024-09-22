import express from 'express'
import { login } from '../routes/login.js';
import { signup } from '../routes/signup.js';
import { Home } from '../routes/Home.js';
const router = express.Router();
router.post('/login', login)
router.post('/signup', signup)
router.get('/home',Home)

export default router;