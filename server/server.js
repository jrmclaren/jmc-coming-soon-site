require("dotenv").config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const app = express();
const publicPath =  path.join(__dirname, "..");
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.static(publicPath));

app.get("/", ( req, res ) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen( PORT, () => {
    console.log(` the site is live on http://localhost:${PORT}`);
});
