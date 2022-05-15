    const Models = require('../models/index');

    const addAccompte = req => {
        return new Promise( (resolve, reject) => {
            if(!req.params.wallet_address) return reject( {'error': 'token address is required'})
            Models.user.findOne({ 'wallet_address': req.params.wallet_address }, (err, user) => {
                if(err) reject(err)
                else{
                    if (!user) {
                        Models.user.create({ 'wallet_address': req.params.wallet_address })
                        .then( data => {
                            resolve(data) 
                        })
                        .catch( err => reject(err) )
                    }else {
                        reject( {'error': 'user alerady exist'})
                    }
                }
            })
        })
    }

    const readOne = req => {
        return new Promise((resolve, reject) => {
            if(!req.params.wallet_address) return reject( {'error': 'token address is required'})
            Models.user.findOne({ 'wallet_address': req.params.wallet_address })
                .populate({ 
                    path: 'favoris' 
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

    const updateOne = req => {
        return new Promise((resolve, reject) => {
            const {email, username, profile_photo, cover_image, bio, twitter_username, instagram_username} = req.body
            if(!req.params.wallet_address) return reject( {'error': 'token address is required'})
            Models.user.updateOne( 
                { 'wallet_address': req.params.wallet_address }, 
                {'email': email, 'username': username, 'profile_photo': profile_photo, 'cover_image': cover_image, 'bio': bio, 'twitter_username': twitter_username, 'instagram_username': instagram_username}, 
                { returnOriginal: false },
                (err, user) => {
                return err
                ? reject(err)
                : resolve(user) 
            })
        })
    }


    module.exports = {
        updateOne,
        readOne,
        addAccompte
    }