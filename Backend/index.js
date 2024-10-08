import express from 'express'; 
import cors from 'cors';
import Connect from './config/index.js';
import dotenv from 'dotenv';
import router from './auth/auth.js';
import cookieParser from 'cookie-parser';

dotenv.config();


Connect();

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://geneartiveai.onrender.com', 
  credentials: true,
  methods: 'GET, POST, PUT, DELETE'
}));

// Routes
app.use("/ai", router);

// Server setup
const Port = process.env.Port || 3000;
app.listen(Port, () => console.log(`Server started on port ${Port}`));

