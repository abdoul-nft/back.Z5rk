
    const express = require('express');
    const { checkSchema, validationResult} = require('express-validator');
    const Controllers = require('../controller/index');
    const User = require('../models/user.model')

    class RouterClass{
        constructor(){
            this.router = express.Router();

            this.registrationSchema = {
                email: {
                    custom: {
                        options: value => {
                            return User.find({
                                email: value
                            }).then(user => {
                                if (user.length > 0) {
                                    return Promise.reject('Email address already taken')
                                }
                            })
                        }
                    }
                },
                wallet_address: {
                    custom: {
                        options: value => {
                            return User.find({
                                wallet_address: value
                            }).then(user => {
                                if (user.length > 0) {
                                    return Promise.reject('Wallet address already taken')
                                }
                            })
                        }
                    }
                },
            }

            this.loginSchema = {
                email: {
                    isEmail: true,
                }
            }

        }

        routes() {

            this.router.get('/register', 
            checkSchema(this.registrationSchema),
            (req, res) => {
                return res.status(400).json({
                    success: false,
                    errors: ''
                });
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        success: false,
                        errors: errors.array()
                    });
                }
                Controllers.auth.register(req)
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

            this.router.post('/login', checkSchema(this.loginSchema), (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        success: false,
                        errors: errors.array()
                    });
                }
                Controllers.auth.login(req, res)
                .then( apiResponse => res.json( { user: apiResponse, err: null } ))
                .catch( apiError => res.status(401).json( { user: null, err: apiError } ))
            })
        }

        init(){
            this.routes();
            return this.router;
        }
    }


    module.exports = RouterClass;