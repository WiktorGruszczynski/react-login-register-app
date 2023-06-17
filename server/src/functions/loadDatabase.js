const {mongoose} = require("mongoose");
require('dotenv').config();

const uri = process.env.DB_URI;


module.exports = async () => {
    await mongoose.connect(uri).then(
        console.log("Connected to mongodb")
    )
    .catch(console.error)
}