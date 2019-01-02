const   mongoose = require('mongoose'),
        collectionSchema = new mongoose.Schema({
            name: 'string',
            contents: [mongoose.Schema.Types.Mixed]
        });
module.exports = mongoose.model("Collection", collectionSchema);