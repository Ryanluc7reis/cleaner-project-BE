import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 

import UserSignup from "./controllers/user/signup.js";
import UserAndCleanerLogin from "./controllers/user/login.js";
import CleanerSignup from "./controllers/user/signupAscleaner.js"


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
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', UserSignup);
app.use('/user', UserAndCleanerLogin);
app.use('/user', CleanerSignup);

app.listen(port, () => console.log(`App rodando em http://localhost:${port}`));