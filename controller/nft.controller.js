
const Models = require('../models/index');
const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = process.env.NFT_API_SERVER_URL;
const appId = process.env.NFT_API_APP_ID;
const moralisSecret = process.env.NFT_API_MORALIS_SECRET;

    const searchNFTs = (req) => {
      return new Promise( async (resolve, reject) => {
          if(!req.query.q) return reject( {'error': 'query is required'})
          await Moralis.start({ serverUrl, appId, moralisSecret });
          const options = { q: req.query.q, limit: 10};
          try {
            const NFTs = await Moralis.Web3API.token.searchNFTs(options);
            if(NFTs) return resolve(NFTs)
          }catch(err) {
            return reject(err)
          }
      })
    }

    const web3API = async () => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
      
        const price = await Moralis.Web3API.token.getTokenPrice({
          address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          chain: "eth",
        });
        console.log(price);
    };

    const addNftToCollection = (req) => {
      return new Promise( (resolve, reject) => {
      
          req.body.author = req.user._id;
          req.body.isPartOf = req.params.collectionId;

          Models.nft.create(req.body)
          .then( async nftData => {
              await Models.collection.findByIdAndUpdate(req.params.collectionId, { $push: { nfts: nftData._id } })
              return resolve({ nft: nftData })
          })
          .catch( nftError => reject(nftError) )
      })
    };

    const removeNftFromCollection = (req) => {
      return new Promise( (resolve, reject) => {
        Models.nft.deleteOne({ _id: req.params.id }, (err, data) => {
          return err
          ? reject(err)
          : resolve(data)
        })
      })
    };


    const getNftMetadata = (req) => {
      return new Promise( async (resolve, reject) => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
        if(!req.params.address) return reject( {'error': 'token address is required'})
        const options = { address: req.params.address};
        try {
          const data = await Moralis.Web3API.token.getNFTMetadata(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    };

    const getNftOwners = (req) => {
      return new Promise( async (resolve, reject) => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
        if(!req.params.address) return reject( {'error': 'token address is required'})
        const options = { address: req.params.address};
        try {
          const data = await Moralis.Web3API.token.getNFTOwners(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    };

    const getNftTrades = (req) => {
      return new Promise( async (resolve, reject) => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
        if(!req.params.address) return reject( {'error': 'token address is required'})
        const options = { address: req.params.address};
        try {
          const data = await Moralis.Web3API.token.getNFTTrades(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    };

    const getNftTransfers = (req) => {
      return new Promise( async (resolve, reject) => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
        if(!req.params.address) return reject( {'error': 'token address is required'})
        const options = { address: req.params.address};
        try {
          const data = await Moralis.Web3API.account.getNFTTransfers(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    };


    const getNftsForContract = (req) => {
      return new Promise( async (resolve, reject) => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
        if(!req.params.address) return reject( {'error': 'token address is required'})
        const options = { address: req.params.address, token_address: req.params.token_address };
        try {
          const data = await Moralis.Web3API.account.getNFTsForContract(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    };

    const readAll = () => {
      return new Promise( (resolve, reject) => {
          Models.nft.find( (err, data) => {
              return err
              ? reject(err)
              : resolve(data)
          })
      })
    }

    const getNativeBalance = async (req) => {
      return new Promise( async (resolve, reject) => {
        await Moralis.start({ serverUrl, appId, moralisSecret });
        if(!req.params.address) return reject( {'error': 'token address is required'})
        
        const options = {
          chain: "rinkeby",
          address: req.params.address,
        }

        try {
          const data = await Moralis.Web3API.account.getNativeBalance(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }

      })
    }


    const getTransactions = async (req) => {
      return new Promise( async (resolve, reject) => {

        await Moralis.start({ serverUrl, appId, moralisSecret });
        if(!req.params.address) return reject( {'error': 'token address is required'})

        const options = {
          chain: "rinkeby",
          address: req.params.address,
          order: "desc",
        }

        try {
          const data = await Moralis.Web3API.account.getTransactions(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }

      })
    }

    module.exports = {
      addNftToCollection,
      removeNftFromCollection,
      getNftTrades,
      getNftMetadata,
      getNftOwners,
      getNftsForContract,
      getNftTransfers,
      searchNFTs,
      web3API,
      readAll,
      getNativeBalance,
      getTransactions
    }