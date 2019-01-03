const   mongoose = require('mongoose'),
        collectionSchema = new mongoose.Schema({
            type: {type: String, default: "collection"},
            name: String,
            contents: [mongoose.Schema.Types.Mixed]
        });
module.exports = mongoose.model("Collection", collectionSchema);