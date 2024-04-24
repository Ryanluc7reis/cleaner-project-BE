import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 

import UserAndCleanerSignup from "./controllers/user/signup.js";
import UserAndCleanerLogin from "./controllers/user/login.js";
import ValidateSession from "./controllers/user/validateSession.js"
import UserLogout from './controllers/user/logout.js'
import VerifyCleaner from './controllers/user/findCleaner.js'
import CardCleaner from './controllers/card/index.js'
import IndexUser from './controllers/user/index.js'
import IndexCleaningService from './controllers/cleaningservice/index.js'
import IndexNotification from './controllers/notification/index.js'

const MONGO_URI = process.env.MONGODB_URI

mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {
  console.log('Connected to Database');
})
.catch(error => {
  console.error('Error connecting to database:', error);
});

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/user', UserAndCleanerSignup);
app.use('/user', UserAndCleanerLogin);
app.use('/user', ValidateSession);
app.use('/user', UserLogout);
app.use('/cleaner', CardCleaner);
app.use('/user', VerifyCleaner);
app.use('/user', IndexUser);
app.use( IndexCleaningService);
app.use(IndexNotification)

app.listen(port, () => console.log(`App rodando em http://localhost:${port}`));
