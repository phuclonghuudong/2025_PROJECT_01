const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
dotenv.config();
const connectDB = require("./config/connectDB");
const userRouter = require("./route/user.route.js");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const PORT = 2410 || process.env.PORT;

app.get("/", (request, response) => {
  response.json({
    message: "Server is running " + PORT,
  });
});
app.use("/api/user", userRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
});
