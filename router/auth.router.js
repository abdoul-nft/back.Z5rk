
    const express = require('express');
    const { checkSchema, validationResult} = require('express-validator');
    const Controllers = require('../controller/index');
    const User = require('../models/user.model')

    class RouterClass{
        constructor(){
            this.router = express.Router();
        }

        routes() {
            this.router.get('/add/:wallet_address', 
            (req, res) => {
                Controllers.auth.addAccompte(req)
                .then( apiResponse => res.json( { user: apiResponse, err: null } ))
                .catch( apiError => res.status(401).json( { user: null, err: apiError } ))
            })

            this.router.get('/account/:wallet_address', (req, res) => {
                Controllers.auth.readOne(req)
                    .then(apiResponse => res.json({ user: apiResponse, err: null }))
                    .catch(apiError => res.status(500).json({ user: null, err: apiError }))
            })

            this.router.put('/account/:wallet_address', (req, res) => {
                Controllers.auth.updateOne(req)
                    .then(apiResponse => res.json({ user: apiResponse, err: null }))
                    .catch(apiError => res.status(500).json({ user: null, err: apiError }))
            })
        }

        init(){
            this.routes();
            return this.router;
        }
    }


    module.exports = RouterClass;