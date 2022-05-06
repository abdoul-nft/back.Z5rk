
    const bcrypt = require('bcryptjs');
    const Models = require('../models/index');

    const register = req => {
        return new Promise( (resolve, reject) => {
            Models.user.create(req.body)
            .then( user => {
                resolve(user) 
            })
            .catch( err => reject(err) )
        })
    }

    const readOne = req => {
        return new Promise((resolve, reject) => {
            Models.user.findOne({ 'wallet_address': req.params.wallet_address }, (err, user) => {
                return err
                ? reject(err)
                : resolve(user)
            })
        })
    }    

    const updateOne = req => {
        return new Promise((resolve, reject) => {
            Models.user.updateOne( { 'wallet_address': req.params.wallet_address }, req.body, (err, user) => {
                return err
                ? reject(err)
                : resolve(user) 
            })
        })
    }

    const login = (req, res) => {
        return new Promise( (resolve, reject) => {
            Models.user.findOne( { email: req.body.email } )
            .then( data => {
                const passwordValisation = bcrypt.compareSync( req.body.password, data.password );
                if( passwordValisation) {
                    
                    const userToken = data.generateJwt(data);

                    return resolve({
                        'access_token': userToken,
                        'user': data,
                    })
                    
                }
                else{ return reject('Password not valide') }
            })
            .catch( err => reject(err) )
        })
    }


    module.exports = {
        register,
        updateOne,
        readOne,
        login
    }