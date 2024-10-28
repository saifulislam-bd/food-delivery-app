import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { dbConnection } from "./config/dbConnection";
import userRoute from "./routes/user.route";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
// default middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is listening on port: ${PORT}`);
});
