const mongoose = require('mongoose');
const { Schema } = mongoose;

const MySchema = new Schema({
    token_id: String,
    token_address: {
        unique: true,
        type: String
    },
    owner: String,
    image: String,
    name: String,
    floor_price: {
        type: String,
        default: null
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'like'
    }],
    isPartOfUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    dateCreated: {
        type: Date,
        default: new Date()
    }
})

const MyModel = mongoose.model('nft', MySchema);
module.exports = MyModel;