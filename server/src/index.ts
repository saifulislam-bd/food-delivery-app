import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { dbConnection } from "./config/dbConnection";
import userRoute from "./routes/user.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import restaurantRoute from "./routes/restaurant.route";
import responseMessage from "./constant/responseMessage";
import httpError from "./utils/httpError";
import globalErrorHandler from "./middlewares/globalErrorHandler";
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
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error(responseMessage.NOT_FOUND("route"));
  } catch (err) {
    httpError(next, err, req, 404);
  }
});

// Global Error Handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is listening on port: ${PORT}`);
});
