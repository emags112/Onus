const   mongoose        = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose'),
        userSchema = new mongoose.Schema({
            type: {type: String, default: "user"},
            name: String,
            username: String,
            password: String,
            collections: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Collection'
            }]
        });
userSchema.plugin(passportLocalMongoose)        
module.exports = mongoose.model("User", userSchema);