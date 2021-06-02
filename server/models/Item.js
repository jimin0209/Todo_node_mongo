const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    key: mongoose.Schema.Types.ObjectId,
    task: String,
    group: String,
    state: {
        type: Boolean,
        default: false
    }
});

ItemSchema.statics.saveItem = function (parameter, cb) {
    let row = new Item(parameter);
    row['key'] = new mongoose.Types.ObjectId();
        
    return cb(row);
}


const Item = mongoose.model('Item', ItemSchema);

module.exports = { Item }