const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
  })
  .then((data) => {
    if (!data) console.error("error with mongoose connection");
    else console.log("Mongoose connected✅");
  });

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const CategoryRouter = require("./routes/category");
const authRouter = require("./routes/auth")

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/category", CategoryRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

module.exports = app;
