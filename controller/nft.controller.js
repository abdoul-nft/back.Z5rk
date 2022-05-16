const Models = require('../models/index');
const Moralis = require("moralis/node");

const serverUrl = process.env.NFT_API_SERVER_URL
const appId = process.env.NFT_API_APP_ID
const moralisSecret = process.env.NFT_API_MORALIS_SECRET


    const saveMintedNft = (req) => {
      return new Promise( async (resolve, reject) => {
        const { wallet_address } = req.params
        if(!wallet_address) return reject( {'error': 'token address is required'})
        const user = await Models.user.findOne({wallet_address: wallet_address})
        if(!user) return reject('User not found error')
        req.body.isPartOfUser = user._id;
        req.body.owner = wallet_address;
        Models.nft.create(req.body)
        .then( async nftData => {
          await Models.user.findByIdAndUpdate(user._id, { $push: { collected: nftData._id } }, { returnOriginal: false })
          return resolve({ nft: nftData })
        })
        .catch( nftError => reject(nftError) )
      })
    };


    const likeNft = (req) => {
      return new Promise( async (resolve, reject) => {
        const { wallet_address, token_address } = req.params
        if(!wallet_address) return reject( {'error': 'token address is required'})
        const user = await Models.user.findOne({wallet_address: wallet_address})
        if(!user) return reject('User not found error')
        Models.nft.findOne({token_address: token_address})
        .then( async nftData => {
          const like = Models.like.create({ nft: nftData._id, user: user._id });
          await Models.nft.findByIdAndUpdate(nftData._id, { $push: { likes: like._id } }, { returnOriginal: false })
          await Models.user.findByIdAndUpdate(user._id, { $push: { favoris: nftData._id } }, { returnOriginal: false })
          return resolve({ nft: nftData })
        })
        .catch( nftError => reject(nftError) )
      })
    };

    const getCurrentUserNfts = (req) => {
      return new Promise((resolve, reject) => {
        const { wallet_address } = req.params
        if(!wallet_address) return reject( {'error': 'token address is required'})
        Models.user.findOne({ 'wallet_address': wallet_address })
          .populate({ 
            path: 'favoris' 
          })
          .populate({ 
            path: 'collected', 
          })
          .exec((err, data) => {
            if (err) { return reject(err) } else {
              return resolve(data)
            }
          })
      })
    }

    const searchNFTs = (req) => {
      return new Promise( async (resolve, reject) => {
        try {
          if(!req.query.q) return reject( {'error': 'query is required'})
          await Moralis.start({ serverUrl, appId, moralisSecret })
          const options = { 
            chain: "testnet",
            q: req.query.q, 
            limit: 10
          };
          const NFTs = await Moralis.Web3API.token.searchNFTs(options);
          if(NFTs) return resolve(NFTs)
        }catch(err) {
          return reject(err)
        }
      })
    }

    const getNftMetadata = (req) => {
      return new Promise( async (resolve, reject) => {
        try {
          await Moralis.start({ serverUrl, appId, moralisSecret })
          if(!req.params.address) return reject( {'error': 'token address is required'})
          const options = { address: req.params.address};
          const data = await Moralis.Web3API.token.getNFTMetadata(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    };

    const getNftOwners = (req) => {
      return new Promise( async (resolve, reject) => {
        try {
          await Moralis.start({ serverUrl, appId, moralisSecret })
          if(!req.params.address) return reject( {'error': 'token address is required'})
          const options = { address: req.params.address};
          const data = await Moralis.Web3API.token.getNFTOwners(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    };

    const getNftAsset = async (req) => {
      return new Promise( async (resolve, reject) => {
        try {
          await Moralis.start({ serverUrl, appId, moralisSecret })
          if(!req.params.address) return reject( {'error': 'token address is required'})
          const options = {
            network: 'rinkeby',
            tokenAddress: req.params.address,
          }

          const data = await Moralis.Plugins.opensea.getAsset(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    }

    const getNftOrders = async (req) => {
      return new Promise( async (resolve, reject) => {
        try {
          await Moralis.start({ serverUrl, appId, moralisSecret })
          if(!req.params.address) return reject( {'error': 'token address is required'})
          const options = {
            network: 'rinkeby',
            tokenAddress: req.params.address,
            page: 1, // pagination shows 20 orders each page
          }
          const data = await Moralis.Plugins.opensea.getOrders(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }

      })
    }

    const getNftFloorPrice = (req) => {
      return new Promise( async (resolve, reject) => {
        try {
          await Moralis.start({ serverUrl, appId, moralisSecret })
          if(!req.params.address) return reject( {'error': 'token address is required'})
          const options = { 
            address: req.params.address, 
            chain: 'testnet',
            days: 7
          };
          const data = await Moralis.Web3API.token.getNFTLowestPrice(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    };

    const getNftTrades = (req) => {
      return new Promise( async (resolve, reject) => {
        try {
          await Moralis.start({ serverUrl, appId, moralisSecret })
          if(!req.params.address) return reject( {'error': 'token address is required'})
          const options = { address: req.params.address};
          const data = await Moralis.Web3API.token.getNFTTrades(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    };

    const getNftTransfers = (req) => {
      return new Promise( async (resolve, reject) => {
        try {
          await Moralis.start({ serverUrl, appId, moralisSecret })
          if(!req.params.address) return reject( {'error': 'token address is required'})
          const options = { address: req.params.address};
          const data = await Moralis.Web3API.account.getNFTTransfers(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    };


    const getNftsForContract = (req) => {
      return new Promise( async (resolve, reject) => {
        try {
          await Moralis.start({ serverUrl, appId, moralisSecret })
          if(!req.params.address) return reject( {'error': 'token address is required'})
          const options = { address: req.params.address, token_address: req.params.token_address };
          const data = await Moralis.Web3API.account.getNFTsForContract(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }
      })
    };

    const getNativeBalance = async (req) => {
      return new Promise( async (resolve, reject) => {
        try {
          await Moralis.start({ serverUrl, appId, moralisSecret })
          if(!req.params.address) return reject( {'error': 'token address is required'})
          const options = {
            chain: "rinkeby",
            address: req.params.address,
          }
          const data = await Moralis.Web3API.account.getNativeBalance(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }

      })
    }

    const getTransactions = async (req) => {
      return new Promise( async (resolve, reject) => {
        try {
          await Moralis.start({ serverUrl, appId, moralisSecret })
          if(!req.params.address) return reject( {'error': 'token address is required'})
          const options = {
            chain: "rinkeby",
            address: req.params.address,
            order: "desc",
          }
          const data = await Moralis.Web3API.account.getTransactions(options);
          if(data) return resolve(data)
        }catch(err) {
          return reject(err)
        }

      })
    }

    module.exports = {
      getNftTrades,
      getNftMetadata,
      getNftOwners,
      getNftsForContract,
      getNftTransfers,
      searchNFTs,
      getNativeBalance,
      getTransactions,
      getNftFloorPrice,
      getNftAsset,
      getNftOrders,
      saveMintedNft,
      likeNft,
      getCurrentUserNfts,
    }