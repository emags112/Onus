const   mongoose = require('mongoose'),
        itemSchema = new mongoose.Schema({
            name: String,
            description: String,
            purchaseDate: Date,
            serialNumber: String,
            value: String,
            tags: [String]
        });
module.exports = mongoose.model("Item", itemSchema);