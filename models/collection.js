const   mongoose        = require('mongoose'),
        collectionSchema = new mongoose.Schema({
            type: {type: String, default: "collection"},
            name: String,
            contents: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item"
            }]
        });
module.exports = mongoose.model("Collection", collectionSchema);