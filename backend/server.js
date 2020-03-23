const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//config Express App
const app = express();
app.use(express.json());
app.use(cors());

//config PORT
const PORT = process.env.PORT || 5000;

//config MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once("open", () =>
    console.log("MongoDB connection has been established!")
);

//config routes
const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

app.listen(PORT, () => console.log("Server is running at PORT " + PORT + "!"));
