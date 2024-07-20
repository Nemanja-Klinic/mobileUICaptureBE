require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./src/routes/index");
const app = express();
const port = process.env.PORT_NUMBER;
const db_url = process.env.DATABASE_URL;

app.use(express.json());
mongoose.connect(db_url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
