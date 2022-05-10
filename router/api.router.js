const express = require('express');
const Controllers = require('../controller/index');

class RouterClass {
    constructor(){
        this.router = express.Router();
    }

    routes() {

        this.router.get('/', (req, res) => {
            return res.json({ msg: "Hello API" })
        })

        /* Get user balance*/
        this.router.get('/get-balance/:address', (req, res) => {
            Controllers.nft.getNativeBalance(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        /* Get user balance*/
        this.router.get('/get-transactions/:address', (req, res) => {
            Controllers.nft.getTransactions(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        /* Search NFTs with Moralis API */
        this.router.get('/nfts', (req, res) => {
            Controllers.nft.searchNFTs(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
        
         /* get Nft Metadata with Moralis API */
        this.router.get('/nfts/:address/metadata', (req, res) => {
            Controllers.nft.getNftMetadata(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        /* get Nft Owners with Moralis API */
        this.router.get('/nfts/:address/owners', (req, res) => {
            Controllers.nft.getNftOwners(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

         /* get Nft Trades with Moralis API */
        this.router.get('/nfts/:address/trades', (req, res) => {
            Controllers.nft.getNftTrades(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        /* get Nft Transfers with Moralis API */
        this.router.get('/nfts/:address/transfers', (req, res) => {
            Controllers.nft.getNftTransfers(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })

        /* Get NFTs For Contract with Moralis API */
        this.router.get('/nfts/:address/:token_address', (req, res) => {
            Controllers.nft.getNftsForContract(req)
                .then(apiResponse => res.json({ data: apiResponse, err: null }))
                .catch(apiError => res.status(500).json({ data: null, err: apiError }))
        })
    }

    init() {
        this.routes();
        return this.router;
    }
}

module.exports = RouterClass;