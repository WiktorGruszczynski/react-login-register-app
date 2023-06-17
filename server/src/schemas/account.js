const {Schema, model} = require("mongoose");

const AccountSchema = new Schema({
    _id: Schema.Types.ObjectId,
    private: {
        email: String,
        password: String
    },
    public: {
        username: String,
        avatar: {type: String, default: ""},
        games: [{type: String}],
    }
})

const directory = "accounts"
module.exports = model("AccountSchema", AccountSchema, directory)