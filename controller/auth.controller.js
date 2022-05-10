
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

    const addAccompte = req => {
        return new Promise( (resolve, reject) => {
            if(!req.params.wallet_address) return reject( {'error': 'token address is required'})
            Models.user.create({ 'wallet_address': req.params.wallet_address })
            .then( user => {
                resolve(user) 
            })
            .catch( err => reject(err) )
        })
    }

    const readOne = req => {
        return new Promise((resolve, reject) => {
            if(!req.params.wallet_address) return reject( {'error': 'token address is required'})
            Models.user.findOne({ 'wallet_address': req.params.wallet_address }, (err, user) => {
                return err
                ? reject(err)
                : resolve(user)
            })
        })
    }    

    const updateOne = req => {
        return new Promise((resolve, reject) => {
            if(!req.params.wallet_address) return reject( {'error': 'token address is required'})
            Models.user.updateOne( { 'wallet_address': req.params.wallet_address }, req.body, (err, user) => {
                return err
                ? reject(err)
                : resolve(user) 
            })
        })
    }


    module.exports = {
        register,
        updateOne,
        readOne,
        addAccompte
    }