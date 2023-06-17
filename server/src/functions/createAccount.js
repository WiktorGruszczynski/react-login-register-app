const Account = require("../schemas/account")
const {Types} = require("mongoose")

module.exports = async (email, username, password) => {
    var account = new Account({
            _id: new Types.ObjectId(),
            private: {
                email: email,
                password: password
            },
            public: {
                username: username,
                avatar: null,
                games: []
            }
        })

    await account.save().then(()=>{console.log("Registered new user")})
    

    return account
}