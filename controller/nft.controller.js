
const Moralis = require("moralis/node");

const serverUrl = process.env.NFT_API_SERVER_URL
const appId = process.env.NFT_API_APP_ID
const moralisSecret = process.env.NFT_API_MORALIS_SECRET

    const searchNFTs = (req) => {
      return new Promise( async (resolve, reject) => {
          try {
            if(!req.query.q) return reject( {'error': 'query is required'})
            await Moralis.start({ serverUrl, appId, moralisSecret })
            const options = { q: req.query.q, limit: 10};
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
      getTransactions
    }