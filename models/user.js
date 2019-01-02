const   mongoose = require('mongoose'),
        userSchema = new mongoose.Schema({
            name: String,
            email: String,
            password: String,
            collections: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Collection'
            }]
        });
module.exports = mongoose.model("User", userSchema);