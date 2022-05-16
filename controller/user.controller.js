const Models = require('../models/index');


const getAllCreators = () => {
    return new Promise((resolve, reject) => {
        Models.user.find()
            .populate({ 
                path: 'favoris',
            })
            .populate({ 
                path: 'collected' 
            })
            .exec((err, data) => {

                if (err) { return reject(err) } else {
                    return resolve(data)
                }
            })
    })
}


module.exports = {
    getAllCreators,
}