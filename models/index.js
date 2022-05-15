const { Model } = require('mongoose')



const Models = {
    user: require('./user.model'),
    nft: require('./nft.model'),
    like: require('./like.model'),
    comment: require('./comment.model'),
    collection: require('./collection.model'),
}


module.exports = Models;