const mongoose = require('mongoose');
const { Schema } = mongoose;


const MySchema = new Schema({

    nft: {
        type: Schema.Types.ObjectId,
        ref: 'nft'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    isPartOfNft: {
        type: Schema.Types.ObjectId,
        ref: 'nft'
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    dateUpdated: {
        type: Date,
        default: null
    }
})

const MyModel = mongoose.model('like', MySchema);
module.exports = MyModel;