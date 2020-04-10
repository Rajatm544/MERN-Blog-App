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
    useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () =>
    console.log("MongoDB connection has been established!")
);

//config routes
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

//Load the npm build package of the frontend CRA
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend", "build")));

    // ...
    // Right before your app.listen(), add this:
    app.get("*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "../frontend", "build", "index.html")
        );
    });
}

//Host app at PORT
app.listen(PORT, () => console.log("Server is running at PORT " + PORT + "!"));
