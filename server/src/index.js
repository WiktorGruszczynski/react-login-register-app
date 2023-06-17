const loadDatabase = require("./functions/loadDatabase");
const express = require("express");
const cors = require("cors");
const routes = require("./routes")
const multer = require("multer")

const app = express();
app.use(express.json())
app.use(cors());
app.use('/', routes)

loadDatabase()
const port = 5000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})