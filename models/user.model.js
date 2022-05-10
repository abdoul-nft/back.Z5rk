
    // const jwt = require('jsonwebtoken');
    const mongoose = require('mongoose');
    const { Schema } = mongoose;


    const MySchema = new Schema({
        email: { 
            type: String,
            default : null
        },
        username: {
            type: String ,
            default: 'Unamed'
        },
        wallet_address: {
            unique: true, 
            type: String 
        },
        bio: {
            type: String ,
            default : null
        },
        twitter_username: {
            type: String ,
            default : null
        },
        instagram_username: {
            type: String ,
            default : null
        },
        
        dateCreated: {
            type: Date,
            default: new Date()
        },
        lastConnection: {
            type: Date,
            default: new Date()
        }
    })

    const MyModel = mongoose.model('user', MySchema);
    module.exports = MyModel;