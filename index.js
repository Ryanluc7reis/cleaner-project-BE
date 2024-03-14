import express from "express"

import userRouter from "./src/controllers/user.js";

const app = express();
const port = process.env.PORT || 3333;

app.use('/ola', userRouter );

app.listen(port, () => console.log(`App rodando em http://localhost:${port}`));


  