import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./config/dbConnection";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
//app.use('/api/v1', router);

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is listening on port: ${PORT}`);
});
