//import extensionizer from 'extensionizer'
import StorageService from './StorageService'
//import LeftPanelService from './LeftPanelService'
import ApiService from './ApiService'
import FirebaseService from './FirebaseService'
import { NODE, CONTRACT_ADDRESS, MAX_APPROVE_VALUE } from '../constants/index'
import createEosABI from '../utils/createEos.abi.json'
import createIostABI from '../utils/createIost.abi.json'
import erc20ABI from '../utils/erc20.abi.json'
import spinABI from '../utils/spin.abi.json'
import Axios from 'axios'

import BinanceService from '../modules/BinanceService'
import BitcoinService from '../modules/BitcoinService'
import CoinGenerator from '../modules/CoinGenerator'
import EosService from '../modules/EosService'
import EthereumService from '../modules/EthereumService'
import IostService from '../modules/IostService'
import RippleService from '../modules/RippleService'
import TronService from '../modules/TronService'
import { setAllAccountInfo } from '../reducers/appReducer'

const WalletService = {
    popup: false,
    //appState: APP_STATE.UNINITIALISED,
    transactionQueue: null,
    pool: false,
    accountInfo: [],
    selectedCoinIndex: false,
    lastRequestTime: 0,
    updateBalanceCallback: false,
    store: false,
    init(ethereumJsonRpcRepsonse) {
        console.log(NODE.TRON[StorageService.setting.network.TRON])

        // update network setting for old users
        for (let key in NODE) {
            if (!StorageService.setting.network.hasOwnProperty(key)) {
                StorageService.setting.network[key] = 'MAINNET'
                StorageService.saveSetting()
            }
        }
        // init
        EthereumService.init({
            networkID: NODE.ETHEREUM[StorageService.setting.network.ETHEREUM].ID,
            networkURL: NODE.ETHEREUM[StorageService.setting.network.ETHEREUM].URL,
            networkName: NODE.ETHEREUM[StorageService.setting.network.ETHEREUM].NAME,
            socketURL: NODE.ETHEREUM[StorageService.setting.network.ETHEREUM].SOCKET,
            callResponse: ethereumJsonRpcRepsonse
        })

        TronService.init({
            node: NODE.TRON[StorageService.setting.network.TRON]
        })

        EosService.init({
            networkURL: NODE.EOS[StorageService.setting.network.EOS].URL
        })

        BinanceService.init({
            networkURL: NODE.BINANCE[StorageService.setting.network.BINANCE].URL,
            networkName: NODE.BINANCE[StorageService.setting.network.BINANCE].NAME,
        })

        RippleService.init({
            networkURL: NODE.RIPPLE[StorageService.setting.network.RIPPLE].URL
        })

        IostService.init({
            networkURL: NODE.IOST[StorageService.setting.network.IOST].URL,
            explorerURL: NODE.IOST[StorageService.setting.network.IOST].EXPLORER_URL
        })
    },

    getEthereumNetworkID() {
        return EthereumService.networkID
    },

    callEthereum(uuid, messageUUID, data, params) {
        return EthereumService.call(uuid, messageUUID, data, params)
    },

    generateMnemonic() {
        return CoinGenerator.generateMnemonic()
    },

    createNewAccount() {
        const coinGenerator = CoinGenerator.generate()
        const accounts = coinGenerator.accounts
        const mnemonic = coinGenerator.mnemonic

        StorageService.saveAccounts(accounts)
        StorageService.saveMnemonic(mnemonic)
    },

    getNetwork() {

        return {
            ethereum: {
                id: EthereumService.networkID,
                url: EthereumService.networkURL
            },
            tron: TronService.node,
            iost: {
                networkURL: IostService.networkURL
            }
        }
    },

    getAddress(coinName = null) {

        if (!StorageService.ready || !StorageService.accounts) return []

        if (coinName) {
            return [StorageService.accounts[coinName].address]
        }

        let result = {}

        for (var key in StorageService.accounts) {
            result[key] = StorageService.accounts[key].address
        }

        return result
    },

    restoreWallet(mnemonicPharse) {
        const coinGenerator = CoinGenerator.insertMnemonic(mnemonicPharse)

        const accounts = coinGenerator.accounts
        const mnemonic = coinGenerator.mnemonic

        StorageService.saveAccounts(accounts)
        StorageService.saveMnemonic(mnemonic)
    },

    async updateServiceAddress() {

        const accounts = StorageService.accounts

        EthereumService.updateAddressAndPrivateKey(accounts.ethereum.address, accounts.ethereum.privateKey)
        TronService.updateAddressAndPrivateKey(accounts.tron.address, accounts.tron.privateKey)
        BitcoinService.updateAddressAndPrivateKey(accounts.bitcoin.address, accounts.bitcoin.privateKey)

        RippleService.updateAddressAndKeyPair(accounts.ripple.address, {
            publicKey: accounts.ripple.publicKey.toUpperCase(),
            privateKey: accounts.ripple.privateKey.toUpperCase()
        })

        EosService.updatePublicKeyAndPrivateKey(accounts.eosActive.publicKey, accounts.eosActive.privateKey).then(address => {
            StorageService.updateEosAddress(address)
        }).catch(ex => {

        })

        IostService.updatePublicKeyAndPrivateKey(accounts.iost.publicKey, accounts.iost.privateKey).then(address => {
            StorageService.updateIostAddress(address)
        }).catch(ex => {

        })

        try {
            await BinanceService.updateAddressAndPrivateKey(accounts.binance.address, accounts.binance.privateKey)
        } catch (ex) {

        }
    },

    async getPrice() {
        const listCoinName = "bitcoin,ethereum,binancecoin,ripple,tron,eos,tether,bittorrent-2,tomochain,iostoken"
        const currencies = "usd,eur,gbp,jpy"
        const URL = `https://api.coingecko.com/api/v3/simple/price?ids=${listCoinName}&vs_currencies=${currencies}&include_24hr_change=true`
        const res = await Axios.get(URL)
        this.price = res.data
        this.price['bittorrent'] = this.price['bittorrent-2']
        this.price['wrapped tron'] = this.price['tron']
        this.price['usdt erc20'] = this.price['tether']
        this.price['usdt trc20'] = this.price['tether']
        this.price['iost'] = this.price['iostoken']
    },

    getTransactionHistories(accountInfo) {
        const coinName = accountInfo.name.toLowerCase()

        if (coinName == 'bitcoin') {
            return BitcoinService.getTransactionHistories()
        }

        if (coinName == 'ethereum' || coinName == 'tomochain') {
            return EthereumService.getTransactionHistories()
        }

        if (coinName == 'binance') {
            return BinanceService.getTransactionHistories()
        }

        if (coinName == 'tron') {
            return TronService.getTransactionHistories()
        }

        if (coinName == 'eos') {
            return EosService.getTransactionHistories()
        }

        if (coinName == 'ripple') {
            return RippleService.getTransactionHistories()
        }

        if (coinName == 'iost') {
            return IostService.getTransactionHistories()
        }

        if (accountInfo.type == 'ERC20') {
            return EthereumService.getTokenTransactionHistories(accountInfo.contractAddress, accountInfo.decimal)
        }



        return []
    },

    async getAllCoinInfo() {

        this.accountInfo[0] = {
            name: 'Bitcoin',
            symbol: 'BTC',
            type: 'coin',
            address: StorageService.accounts.bitcoin.address,
            balance: 0,
            marketData: this.price.bitcoin,
            publicKey: StorageService.accounts.bitcoin.publicKey ? StorageService.accounts.bitcoin.publicKey : null,
            privateKey: StorageService.accounts.bitcoin.privateKey,
            mnemonic: StorageService.mnemonic,
            order: 0
        }

        if (EthereumService.networkName == 'tomochain') {
            this.accountInfo[1] = {
                name: 'Tomochain',
                symbol: 'TOMO',
                type: 'coin',
                address: StorageService.accounts.ethereum.address,
                balance: 0,
                marketData: this.price.tomochain,
                publicKey: StorageService.accounts.ethereum.publicKey ? StorageService.accounts.ethereum.publicKey : null,
                privateKey: StorageService.accounts.ethereum.privateKey,
                order: 1
            }
        } else {
            this.accountInfo[1] = {
                name: 'Ethereum',
                symbol: 'ETH',
                type: 'coin',
                address: StorageService.accounts.ethereum.address,
                balance: 0,
                marketData: this.price.ethereum,
                publicKey: StorageService.accounts.ethereum.publicKey ? StorageService.accounts.ethereum.publicKey : null,
                privateKey: StorageService.accounts.ethereum.privateKey,
                order: 1,
            }
        }


        this.accountInfo[2] = {
            name: 'Binance',
            symbol: 'BNB',
            type: 'coin',
            address: StorageService.accounts.binance.address,
            balance: 0,
            marketData: this.price.binancecoin,
            memo: true,
            publicKey: StorageService.accounts.binance.publicKey ? StorageService.accounts.binance.publicKey : null,
            privateKey: StorageService.accounts.binance.privateKey,
            order: 2
        }

        this.accountInfo[3] = {
            name: 'Ripple',
            symbol: 'XRP',
            type: 'coin',
            address: StorageService.accounts.ripple.address,
            balance: 0,
            marketData: this.price.ripple,
            publicKey: StorageService.accounts.ripple.publicKey ? StorageService.accounts.ripple.publicKey : null,
            privateKey: StorageService.accounts.ripple.privateKey,
            order: 3,
            memo: true
        }

        this.accountInfo[4] = {
            name: 'TRON',
            symbol: 'TRX',
            type: 'coin',
            address: StorageService.accounts.tron.address,
            marketData: this.price.tron,
            publicKey: StorageService.accounts.tron.publicKey ? StorageService.accounts.tron.publicKey : null,
            privateKey: StorageService.accounts.tron.privateKey,
            order: 4
        }

        this.accountInfo[5] = {
            name: 'EOS',
            symbol: 'EOS',
            type: 'coin',
            publicKey: StorageService.accounts.eosActive.publicKey,
            address: EosService.address ? EosService.address : false,
            marketData: this.price.eos,
            memo: true,
            publicKey: StorageService.accounts.eosActive.publicKey ? StorageService.accounts.eosActive.publicKey : null,
            privateKey: StorageService.accounts.eosActive.privateKey,
            ownerPublicKey: StorageService.accounts.eosOwner.publicKey ? StorageService.accounts.eosOwner.publicKey : null,
            ownerPrivateKey: StorageService.accounts.eosOwner.privateKey,
            order: 5
        }

        this.accountInfo[6] = {
            name: 'IOST',
            symbol: 'IOST',
            type: 'coin',
            publicKey: StorageService.accounts.iost.publicKey,
            address: IostService.address ? IostService.address : false,
            marketData: this.price.iost,
            memo: true,
            publicKey: StorageService.accounts.iost.publicKey ? StorageService.accounts.iost.publicKey : null,
            privateKey: StorageService.accounts.iost.privateKey,
            order: 6
        }

        return this.accountInfo
    },

    async getAllTokenInfo() {

        const { tokens, accounts } = StorageService
        for (var i = 0; i < tokens.length; i++) {
            const info = tokens[i]

            // assign order token
            info.order = i + 7
            StorageService.tokens[i].order = info.order
            info.marketData = this.price[info.name.toLowerCase()] ? this.price[info.name.toLowerCase()] : { usd: 0, eur: 0, egp: 0, jpy: 0, usd_24h_change: 0.01 }

            if (info.type == 'ERC20') {
                info.balance = 0
                info.balance /= 10 ** info.decimal
                info.address = EthereumService.address
                info.publicKey = accounts.ethereum.publicKey ? accounts.ethereum.publicKey : null
                info.privateKey = accounts.ethereum.privateKey
            }

            if (info.type == 'TRC20' || info.type == 'TRC10') {
                info.balance = 0
                info.balance /= 10 ** info.decimal
                info.address = TronService.address
                info.publicKey = accounts.tron.publicKey ? accounts.tron.publicKey : null
                info.privateKey = accounts.tron.privateKey
            }

            if (info.type == 'EOSTOKEN') {
                info.balance = 0
                info.balance /= 10 ** info.decimal
                info.address = EosService.address ? EosService.address : 'You need active EOS account first'
                info.publicKey = accounts.eosActive.publicKey ? accounts.eosActive.publicKey : null
                info.privateKey = accounts.eosActive.privateKey
            }

            if (info.type == 'BEP2') {
                info.balance = 0
                info.balance /= 10 ** info.decimal
                info.address = BinanceService.address
                info.publicKey = accounts.binance.publicKey ? accounts.binance.publicKey : null
                info.privateKey = accounts.binance.privateKey
            }

            this.accountInfo[info.order] = info
        }
    },

    async getAllAccountInfo() {
        await this.getPrice()
        this.getAllTokenInfo()
        this.getAllCoinInfo()

        return this.accountInfo
    },

    getTokenBalance() {
        const { tokens } = StorageService
        for (var i = 0; i < tokens.length; i++) {
            const info = tokens[i]
            if (info.type == 'ERC20') {
                EthereumService.getTokenBalance(info.contractAddress, erc20ABI).then(balance => {
                    if (this.accountInfo[info.order].balance !== balance / 10 ** info.decimal) {
                        this.accountInfo[info.order].balance = balance / 10 ** info.decimal
                        this.store.dispatch(setAllAccountInfo(this.accountInfo))
                    }
                }).catch(ex => { })
            }

            if (info.type == 'TRC20' || info.type == 'TRC10') {
                TronService.getTokenBalance(info.type, info.contractAddress, erc20ABI).then(balance => {
                    if (this.accountInfo[info.order].balance !== balance / 10 ** info.decimal) {
                        this.accountInfo[info.order].balance = balance / 10 ** info.decimal
                        this.store.dispatch(setAllAccountInfo(this.accountInfo))
                    }
                }).catch(ex => { })
            }

            if (info.type == 'EOSTOKEN' && EosService.address) {
                EosService.getTokenBalance(info.contractAddress).then(balance => {
                    if (this.accountInfo[info.order].balance !== balance) {
                        this.accountInfo[info.order].balance = balance
                        this.store.dispatch(setAllAccountInfo(this.accountInfo))
                    }
                })
            }

            if (info.type == 'BEP2') {
                BinanceService.getTokenBalance(info.contractAddress).then(balance => {
                    if (this.accountInfo[info.order].balance !== balance) {
                        this.accountInfo[info.order].balance = balance
                        this.store.dispatch(setAllAccountInfo(this.accountInfo))
                    }
                })
            }
        }
    },

    getCoinBalance() {
        BitcoinService.getBalance().then(balance => {
            if (this.accountInfo[0].balance !== balance || this.accountInfo[0].marketData !== this.price.bitcoin) {
                this.accountInfo[0].balance = balance
                this.accountInfo[0].marketData = this.price.bitcoin
                this.store.dispatch(setAllAccountInfo(this.accountInfo))
            }

        }).catch(ex => {
        })

        EthereumService.getBalance().then(balance => {
            let newMarketData = EthereumService.networkName == 'tomochain' ? this.price.tomochain : this.price.ethereum;

            if (this.accountInfo[1].balance !== balance || this.accountInfo[1].marketData !== newMarketData) {
                this.accountInfo[1].balance = balance
                this.accountInfo[1].marketData = newMarketData
                this.store.dispatch(setAllAccountInfo(this.accountInfo))
            }

        }).catch(ex => {
            console.log(ex)
        })

        BinanceService.getBalance().then(balance => {
            if (this.accountInfo[2].balance !== balance || this.accountInfo[2].marketData !== this.price.binancecoin) {
                this.accountInfo[2].balance = balance
                this.accountInfo[2].marketData = this.price.binancecoin
                this.store.dispatch(setAllAccountInfo(this.accountInfo))
            }
        }).catch(ex => {
            console.log(ex)
        })

        RippleService.getBalance().then(balance => {
            if (this.accountInfo[3].balance !== balance || this.accountInfo[3].marketData !== this.price.ripple) {
                this.accountInfo[3].balance = balance
                this.accountInfo[3].marketData = this.price.ripple
                this.store.dispatch(setAllAccountInfo(this.accountInfo))
            }
        })

        TronService.getAccountInfo().then(info => {
            if (this.accountInfo[4].info !== info || this.accountInfo[4].marketData !== this.price.tron) {
                this.accountInfo[4] = Object.assign(this.accountInfo[4], info)
                this.accountInfo[4].marketData = this.price.tron
                this.store.dispatch(setAllAccountInfo(this.accountInfo))
            }
        }).catch(ex => {
            console.log(ex);
        })


        if (EosService.address) {
            EosService.getAccountInfo().then(info => {
                if (this.accountInfo[5].info !== info || this.accountInfo[5].marketData !== this.price.eos || this.accountInfo[5].address !== EosService.address) {
                    this.accountInfo[5] = Object.assign(this.accountInfo[5], info)
                    this.accountInfo[5].marketData = this.price.eos
                    this.accountInfo[5].address = EosService.address
                    this.store.dispatch(setAllAccountInfo(this.accountInfo))
                }
            })
        } else {
            EosService.updatePublicKeyAndPrivateKey(StorageService.accounts.eosActive.publicKey, StorageService.accounts.eosActive.privateKey).then(address => {
                this.accountInfo[5].address = address
                this.store.dispatch(setAllAccountInfo(this.accountInfo))
            }).catch(ex => { })
        }

        if (IostService.address) {
            IostService.getBalance().then(balance => {
                if (this.accountInfo[6].balance !== balance || this.accountInfo[6].marketData !== this.price.iost) {
                    this.accountInfo[6].balance = balance
                    this.accountInfo[6].marketData = this.price.iost
                    this.store.dispatch(setAllAccountInfo(this.accountInfo))
                }
            })
        } else {
            IostService.updatePublicKeyAndPrivateKey(StorageService.accounts.iost.publicKey, StorageService.accounts.iost.privateKey).then(address => {
                this.accountInfo[6].address = address
                this.store.dispatch(setAllAccountInfo(this.accountInfo))
            }).catch(ex => { })
        }
    },

    startPool() {
        console.log("START POOLING")

        this.getCoinBalance()
        this.getTokenBalance()

        this.pool = setInterval(() => {
            this.lastOpenPopupTime = new Date().getTime()
            this.getPrice()
            this.getCoinBalance()
            this.getTokenBalance()
        }, 60000)
    },

    stopPool() {
        console.log("STOP POOLING")
        clearInterval(this.pool)
    },

    send(data) {
        const { coinInfo, to, value, memo } = data

        if (coinInfo.name.toLowerCase() == 'bitcoin') {
            return BitcoinService.send(to, value)
        }

        if (coinInfo.name.toLowerCase() == 'ethereum' || coinInfo.name.toLowerCase() == 'tomochain') {
            return EthereumService.send(to, value)
        }

        if (coinInfo.name.toLowerCase() == 'binance') {
            return BinanceService.send("BNB", to, value, memo)
        }

        if (coinInfo.name.toLowerCase() == 'tron') {
            return TronService.send(to, value)
        }

        if (coinInfo.name.toLowerCase() == 'eos') {
            return EosService.send(to, value, memo)
        }

        if (coinInfo.name.toLowerCase() == 'ripple') {
            return RippleService.send(to, value, memo)
        }

        if (coinInfo.name.toLowerCase() == 'iost') {
            return IostService.send(to, value, memo)
        }

        if (coinInfo.type == 'TRC10' || coinInfo.type == 'TRC20') {
            return TronService.sendToken(coinInfo.contractAddress, coinInfo.decimal, coinInfo.type, to, value)
        }

        if (coinInfo.type == 'ERC20') {
            return EthereumService.sendToken(coinInfo.contractAddress, erc20ABI, coinInfo.decimal, to, value)
        }

        if (coinInfo.type == 'EOSTOKEN') {
            return EosService.sendToken(coinInfo.contractAddress, coinInfo.decimal, coinInfo.symbol, to, value, memo)
        }

        if (coinInfo.type == 'BEP2') {
            return BinanceService.send(coinInfo.contractAddress, to, value, memo)
        }

    },

    async getPriceToCreateEos() {
        const tron = await TronService.callContractFunction(CONTRACT_ADDRESS.TRONEOS, 'PRICE')
        const usdt = await TronService.callContractFunction(CONTRACT_ADDRESS.TRONEOS, 'USDT_PRICE')
        const ethereum = await EthereumService.callContractFunction(CONTRACT_ADDRESS.ETHEREUMEOS, 'PRICE', createEosABI)

        return {
            trx: tron.toNumber() / 10 ** 6,
            usdt: usdt.toNumber() / 10 ** 6 + 0.00001,
            eth: (ethereum.toString() / 10 ** 18) + 0.00001
        }
    },

    async getPriceToCreateIost() {
        const tron = await TronService.callContractFunction(CONTRACT_ADDRESS.TRONIOST, 'PRICE')
        const usdt = await TronService.callContractFunction(CONTRACT_ADDRESS.TRONIOST, 'USDT_PRICE')
        const ethereum = await EthereumService.callContractFunction(CONTRACT_ADDRESS.ETHEREUMIOST, 'PRICE', createIostABI)

        return {
            trx: tron.toNumber() / 10 ** 6,
            usdt: usdt.toNumber() / 10 ** 6 + 0.00001,
            eth: (ethereum.toString() / 10 ** 18) + 0.00001
        }
    },

    async createEosAccount(payment, name, callback) {
        payment = payment.toLowerCase()

        const activePublicKey = StorageService.accounts.eosActive.publicKey
        const activePrivateKey = StorageService.accounts.eosActive.privateKey
        const ownerPublicKey = StorageService.accounts.eosOwner.publicKey
        const price = await this.getPriceToCreateEos()

        if (payment == 'trx') {

            const tronAccount = await TronService.getAccountInfo()

            if (tronAccount.balance < price.trx) {
                callback(`Your balance not enough ${price.trx} TRX`)
            }

            try {
                await TronService.sendContractFunction(CONTRACT_ADDRESS.TRONEOS, 'createEosAccount', [name, activePublicKey, ownerPublicKey], price.trx * 10 ** 6)
            } catch (error) {
                callback(error)
            }
        }

        if (payment == 'usdt_trc20') {
            let usdtBalance = await TronService.callContractFunction(CONTRACT_ADDRESS.TRONUSDT, 'balanceOf', [TronService.address])
            usdtBalance = usdtBalance.toNumber() / 10 ** 6

            if (usdtBalance < price.usdt) {
                callback(`Your balance not enough ${price.usdt} USDT`)
            }

            // check approve
            let allowance = await TronService.callContractFunction(CONTRACT_ADDRESS.TRONUSDT, 'allowance', [TronService.address, CONTRACT_ADDRESS.TRONEOS])
            allowance = allowance.remaining.toString()
            let avaiableAllowance = false

            if (allowance.length >= 7) {
                avaiableAllowance = true
            } else {
                if (parseInt(allowance) / 10 ** 6 > price.usdt) {
                    avaiableAllowance = true
                }
            }

            if (avaiableAllowance) {
                TronService.sendContractFunction(CONTRACT_ADDRESS.TRONEOS, 'createEosAccountWithUSDT', [name, activePublicKey, ownerPublicKey]).catch(error => {
                    callback(error)
                })
            } else {
                TronService.sendContractFunction(CONTRACT_ADDRESS.TRONUSDT, 'approve', [CONTRACT_ADDRESS.TRONEOS, MAX_APPROVE_VALUE]).catch(error => {
                    callback(error)
                })

                setTimeout(() => {
                    TronService.sendContractFunction(CONTRACT_ADDRESS.TRONEOS, 'createEosAccountWithUSDT', [name, activePublicKey, ownerPublicKey]).catch(error => {
                        callback(error)
                    })
                }, 5000)
            }
        }

        if (payment == 'eth') {
            const balance = await EthereumService.getBalance()
            if (balance < price.eth) {
                callback(`Your balance not enough ${price.eth} ETH`)
            }

            try {
                await EthereumService.sendContractFunction(
                    CONTRACT_ADDRESS.ETHEREUMEOS,
                    'createEosAccount',
                    createEosABI,
                    [name, activePublicKey, ownerPublicKey],
                    EthereumService.Utils.toWei(price.eth.toString())
                )
            } catch (error) {
                callback(error)
            }
        }

        if (payment == 'usdt_erc20') {
            let usdtBalance = await EthereumService.callContractFunction(CONTRACT_ADDRESS.ETHEREUMUSDT, 'balanceOf', erc20ABI, [EthereumService.address])

            usdtBalance = usdtBalance.toNumber() / 10 ** 6

            if (usdtBalance < price.usdt) {
                callback(`Your balance not enough ${price.usdt} USDT`)
            }

            // check approve
            let allowance = await EthereumService.callContractFunction(CONTRACT_ADDRESS.ETHEREUMUSDT, 'allowance', erc20ABI, [EthereumService.address, CONTRACT_ADDRESS.ETHEREUMEOS])

            allowance = allowance.toString()
            let avaiableAllowance = false

            if (allowance.length >= 7) {
                avaiableAllowance = true
            } else {
                if (parseInt(allowance) / 10 ** 6 > price.usdt) {
                    avaiableAllowance = true
                }
            }

            if (avaiableAllowance) {
                EthereumService.sendContractFunction(CONTRACT_ADDRESS.ETHEREUMEOS, 'createEosAccountWithUSDT', createEosABI, [name, activePublicKey, ownerPublicKey]).catch(error => {
                    callback(error)
                })
            } else {
                EthereumService.sendContractFunction(CONTRACT_ADDRESS.ETHEREUMUSDT, 'approve', erc20ABI, [CONTRACT_ADDRESS.ETHEREUMEOS, MAX_APPROVE_VALUE]).catch(error => {
                    callback(error)
                })

                setTimeout(() => {
                    EthereumService.sendContractFunction(CONTRACT_ADDRESS.ETHEREUMEOS, 'createEosAccountWithUSDT', createEosABI, [name, activePublicKey, ownerPublicKey]).catch(error => {
                        callback(error)
                    })
                }, 5000)
            }
        }

        let interval = setInterval(async () => {
            try {
                await EosService.updatePublicKeyAndPrivateKey(activePublicKey, activePrivateKey)
                if (EosService.address) {
                    callback()
                    clearInterval(interval)
                }
            } catch (ex) {

            }

        }, 5000)
    },

    async createIostAccount(payment, name, callback) {
        payment = payment.toLowerCase()

        const activePublicKey = StorageService.accounts.iost.publicKey
        const activePrivateKey = StorageService.accounts.iost.privateKey
        const price = await this.getPriceToCreateIost()

        if (payment == 'trx') {

            const tronAccount = await TronService.getAccountInfo()

            if (tronAccount.balance < price.trx) {
                callback(`Your balance not enough ${price.trx} TRX`)
            }

            try {
                await TronService.sendContractFunction(CONTRACT_ADDRESS.TRONIOST, 'createIostAccount', [name, activePublicKey, activePublicKey], price.trx * 10 ** 6)
            } catch (error) {
                callback(error)
            }
        }

        if (payment == 'usdt_trc20') {
            let usdtBalance = await TronService.callContractFunction(CONTRACT_ADDRESS.TRONUSDT, 'balanceOf', [TronService.address])
            usdtBalance = usdtBalance.toNumber() / 10 ** 6

            if (usdtBalance < price.usdt) {
                callback(`Your balance not enough ${price.usdt} USDT`)
            }

            // check approve
            let allowance = await TronService.callContractFunction(CONTRACT_ADDRESS.TRONUSDT, 'allowance', [TronService.address, CONTRACT_ADDRESS.TRONIOST])
            allowance = allowance.remaining.toString()
            let avaiableAllowance = false

            if (allowance.length >= 7) {
                avaiableAllowance = true
            } else {
                if (parseInt(allowance) / 10 ** 6 > price.usdt) {
                    avaiableAllowance = true
                }
            }

            if (avaiableAllowance) {
                TronService.sendContractFunction(CONTRACT_ADDRESS.TRONIOST, 'createIostAccountWithUSDT', [name, activePublicKey, activePublicKey]).catch(error => {
                    callback(error)
                })
            } else {
                TronService.sendContractFunction(CONTRACT_ADDRESS.TRONUSDT, 'approve', [CONTRACT_ADDRESS.TRONIOST, MAX_APPROVE_VALUE]).catch(error => {
                    callback(error)
                })

                setTimeout(() => {
                    TronService.sendContractFunction(CONTRACT_ADDRESS.TRONIOST, 'createIostAccountWithUSDT', [name, activePublicKey, activePublicKey]).catch(error => {
                        callback(error)
                    })
                }, 5000)
            }
        }

        if (payment == 'eth') {
            const balance = await EthereumService.getBalance()
            if (balance < price.eth) {
                callback(`Your balance not enough ${price.eth} ETH`)
            }

            try {
                await EthereumService.sendContractFunction(
                    CONTRACT_ADDRESS.ETHEREUMIOST,
                    'createIostAccount',
                    createIostABI,
                    [name, activePublicKey, activePublicKey],
                    EthereumService.Utils.toWei(price.eth.toString())
                )
            } catch (error) {
                callback(error)
            }
        }

        if (payment == 'usdt_erc20') {
            let usdtBalance = await EthereumService.callContractFunction(CONTRACT_ADDRESS.ETHEREUMUSDT, 'balanceOf', erc20ABI, [EthereumService.address])

            usdtBalance = usdtBalance.toNumber() / 10 ** 6

            if (usdtBalance < price.usdt) {
                callback(`Your balance not enough ${price.usdt} USDT`)
            }

            // check approve
            let allowance = await EthereumService.callContractFunction(CONTRACT_ADDRESS.ETHEREUMUSDT, 'allowance', erc20ABI, [EthereumService.address, CONTRACT_ADDRESS.ETHEREUMIOST])

            allowance = allowance.toString()
            let avaiableAllowance = false

            if (allowance.length >= 7) {
                avaiableAllowance = true
            } else {
                if (parseInt(allowance) / 10 ** 6 > price.usdt) {
                    avaiableAllowance = true
                }
            }

            if (avaiableAllowance) {
                EthereumService.sendContractFunction(CONTRACT_ADDRESS.ETHEREUMIOST, 'createIostAccountWithUSDT', createIostABI, [name, activePublicKey, activePublicKey]).catch(error => {
                    callback(error)
                })
            } else {
                EthereumService.sendContractFunction(CONTRACT_ADDRESS.ETHEREUMUSDT, 'approve', erc20ABI, [CONTRACT_ADDRESS.ETHEREUMIOST, MAX_APPROVE_VALUE]).catch(error => {
                    callback(error)
                })

                setTimeout(() => {
                    EthereumService.sendContractFunction(CONTRACT_ADDRESS.ETHEREUMIOST, 'createIostAccountWithUSDT', createIostABI, [name, activePublicKey, activePublicKey]).catch(error => {
                        callback(error)
                    })
                }, 5000)
            }
        }

        let interval = setInterval(async () => {
            try {
                await IostService.updatePublicKeyAndPrivateKey(activePublicKey, activePrivateKey)
                if (IostService.address) {
                    callback()
                    clearInterval(interval)
                }
            } catch (ex) {

            }
        }, 5000)
    },

    // lock () {
    //     //this.lastOpenPopupTime = 0
    //     StorageService.ready = false
    //     //LeftPanelService.ready = false
    //     StorageService.password = ''
    // },

    changeNetwork(network, callback) {
        this.init(EthereumService.ethereumJsonRpcRepsonse)
        this.lock()
        callback()
    },

    addToken(data) {
        const { type, contractAddress, name, symbol, decimal, defaultValue } = data
        const { tokens } = StorageService

        if (type == 'ERC20' && !EthereumService.isAddress(contractAddress)) throw new Error('Contract Address is not ERC20 Token')
        if (type == 'TRC20' && !TronService.isAddress(contractAddress)) throw new Error('Contract Address is not TRC20 Token')
        if (type == 'EOSTOKEN' && contractAddress.length != 12) throw new Error('Contract Address is not EOS Token')

        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].contractAddress == contractAddress) {
                throw new Error('This token is exist')
            }
        }

        StorageService.tokens.unshift({
            type,
            contractAddress,
            name,
            symbol,
            decimal,
            customToken: true
        })

        StorageService.saveTokens()

        this.getAllTokenInfo()
        this.stopPool()
        this.startPool(this.updateBalanceCallback)
    },

    buyRam(bytes) {
        return EosService.buyRam(bytes)
    },

    sellRam(bytes) {
        return EosService.sellRam(bytes)
    },

    stake(cpu, net) {
        return EosService.stake(cpu, net)
    },

    unstake(cpu, net) {
        return EosService.unstake(cpu, net)
    },

    checkEosAccount(accountName) {
        return EosService.checkEosAccount(accountName)
    },

    checkIostAccount(accountName) {
        return IostService.checkIostAccount(accountName)
    },

    async spin(type, callback) {
        if (type == 'tron') {
            try {
                const res = await TronService.sendContractFunction(CONTRACT_ADDRESS.TRONSPIN, 'spin')
                callback(null, res)
            } catch (error) {
                callback(error, null)
            }
        }

        if (type == 'ethereum') {
            try {
                const res = await EthereumService.sendContractFunction(CONTRACT_ADDRESS.ETHEREUMSPIN, 'spin', spinABI)
                callback(null, res)
            } catch (error) {
                callback(error, null)
            }
        }
    },

    async getLeftConnectInfo(type, callback) {

        let result = {}

        if (type == 'tron') {
            let res = await TronService.callContractFunction(CONTRACT_ADDRESS.TRONSPIN, 'countSpin', [TronService.address])
            let countSpin = res.toNumber()

            if (countSpin > 0) {
                res = await TronService.callContractFunction(CONTRACT_ADDRESS.TRONSPIN, 'spinHistories', [TronService.address, countSpin - 1])
                const lastSpinTime = res.time.toNumber()
                res = await TronService.callContractFunction(CONTRACT_ADDRESS.TRONSPIN, 'NEXT_SPIN_WAIT_TIME')
                const waitTime = res
                result.nextSpinTime = lastSpinTime + waitTime
                result.waitTime = waitTime
            } else {
                result.nextSpinTime = 0
            }
        }

        if (type == 'ethereum') {
            let res = await EthereumService.callContractFunction(CONTRACT_ADDRESS.ETHEREUMSPIN, 'countSpin', spinABI, [EthereumService.address])
            let countSpin = res.toNumber()

            if (countSpin > 0) {
                res = await EthereumService.callContractFunction(CONTRACT_ADDRESS.ETHEREUMSPIN, 'spinHistories', spinABI, [EthereumService.address, countSpin - 1])
                const lastSpinTime = res.time.toNumber()
                res = await EthereumService.callContractFunction(CONTRACT_ADDRESS.ETHEREUMSPIN, 'NEXT_SPIN_WAIT_TIME', spinABI)
                const waitTime = res
                result.nextSpinTime = lastSpinTime + waitTime
                result.waitTime = waitTime
            } else {
                result.nextSpinTime = 0
            }
        }

        callback(result)
    },

    tronTransaction(uuid, messageUUID, transaction, callback, acceptCallback) {

        if (!StorageService.ready) return callback({ error: 'You need unlock wallet first' })

        let transactionDecode = {}

        if (typeof transaction == 'string') {
            transactionDecode = {
                type: 'sign',
                coin: 'tron',
                message: transaction
            }
        } else {
            let transactionType = transaction.raw_data.contract[0].type
            let parameter = transaction.raw_data.contract[0].parameter.value

            transactionDecode = {
                type: 'send',
                coin: 'tron',
                symbol: 'TRX',
                contractAddress: parameter.contract_address ? TronService.tronweb.address.fromHex(parameter.contract_address) : transactionType,
                amount: TronService.tronweb.fromSun(parameter.call_value)
            }

            if (!parameter.contract_address) {
                transactionDecode.hideWhitelist = true
                transactionDecode.json = parameter
            }
        }

        this.transactionQueue = {
            uuid,
            messageUUID,
            rawTransaction: transaction,
            transaction: transactionDecode,
            acceptCallback
        }

        if (this.transactionQueue.transaction && this.transactionQueue.transaction.contractAddress && StorageService.checkWhitelist(this.transactionQueue.transaction.contractAddress)) {
            this.acceptTransaction()
            return;
        }

        //LeftPanelService.ready = false
        this.openPopup()
        callback()
    },

    ethereumTransaction(type, uuid, messageUUID, rpcData, transaction, callback, acceptCallback) {

        if (!StorageService.ready) return callback({ error: 'You need unlock wallet first' })

        let obj = {}

        if (type == 'send') {
            obj = {
                contractAddress: transaction[0].to ? transaction[0].to : 'CreateSmartContract',
                amount: transaction[0].value ? EthereumService.Utils.fromWei(EthereumService.Utils.hexToNumberString(transaction[0].value)) : 0
            }

            if (!transaction[0].to) {
                obj.hideWhitelist = true
                obj.json = transaction[0].data
            }
        }

        if (type == 'sign') {
            if (EthereumService.isAddress(transaction[0])) {
                const temp = transaction[0];
                transaction[0] = transaction[1]
                transaction[1] = temp
            }
            obj = {
                message: EthereumService.Utils.hexToAscii(transaction[0])
            }
        }

        WalletService.transactionQueue = {
            uuid,
            messageUUID,
            rpcData,
            rawTransaction: transaction,
            transaction: Object.assign({
                type,
                coin: 'ethereum',
                symbol: 'ETH',
            },
                obj
            ),
            acceptCallback
        }

        if (this.transactionQueue.transaction && this.transactionQueue.transaction.contractAddress && StorageService.checkWhitelist(this.transactionQueue.transaction.contractAddress)) {
            this.acceptTransaction()
            return;
        }

        //LeftPanelService.ready = false
        this.openPopup()
        callback()
    },

    eosTransaction(uuid, messageUUID, transaction, callback, acceptCallback) {

        if (!StorageService.ready) return callback({ error: 'You need unlock wallet first' })

        this.transactionQueue = {
            uuid,
            messageUUID,
            rawTransaction: transaction,
            transaction: {
                type: 'send',
                coin: 'eos',
                contractAddress: transaction.actions[0].account,
                amount: transaction.actions[0].data.quantity ? parseFloat(transaction.actions[0].data.quantity) : 0,
                symbol: transaction.actions[0].data.quantity ? transaction.actions[0].data.quantity.split(" ")[1] : 'EOS',
                json: transaction.actions[0].data,
                hideWhitelist: true
            },
            acceptCallback
        }

        if (this.transactionQueue.transaction && this.transactionQueue.transaction.contractAddress && StorageService.checkWhitelist(this.transactionQueue.transaction.contractAddress)) {
            this.acceptTransaction()
            return;
        }

        //LeftPanelService.ready = false
        this.openPopup()
        callback()
    },

    iostTransaction(uuid, messageUUID, transaction, callback, acceptCallback) {
        if (!StorageService.ready) return callback({ error: 'You need unlock wallet first' })

        this.transactionQueue = {
            uuid,
            messageUUID,
            rawTransaction: transaction,
            transaction: {
                type: 'send',
                coin: 'iost',
                contractAddress: transaction.actions[0].contract + " > " + transaction.actions[0].actionName,
                amount: transaction.amount_limit[0].value,
                symbol: transaction.amount_limit[0].token.toUpperCase(),
                json: transaction.actions[0].data
            },
            acceptCallback
        }

        if (this.transactionQueue.transaction && this.transactionQueue.transaction.contractAddress && StorageService.checkWhitelist(this.transactionQueue.transaction.contractAddress)) {
            this.acceptTransaction()
            return;
        }

        //LeftPanelService.ready = false
        this.openPopup()
        callback()
    },

    async acceptTransaction() {
        if (this.popup) this.closePopup()

        let { uuid, messageUUID, rpcData, rawTransaction, transaction, acceptCallback } = this.transactionQueue

        let result = null
        let error = null

        if (transaction.coin == 'ethereum') {
            try {
                result = transaction.type == 'sign' ? await EthereumService.personalSign(rawTransaction[0]) : await EthereumService.sendTransaction(rawTransaction[0])
                if(rawTransaction[0].data && FirebaseService.isLoggedIn) {
                    ApiService.addTransactionPending(result, 'ethereum', await FirebaseService.getIdToken())
                }
                acceptCallback(uuid, messageUUID, rpcData, result)
            } catch (error) {
                acceptCallback(uuid, messageUUID, rpcData, {
                    error
                })
            }
        }

        if (transaction.coin == 'tron') {
            try {
                result = await TronService.sign(rawTransaction)

                if(result.raw_data && result.raw_data.contract[0].type == "TriggerSmartContract" && FirebaseService.isLoggedIn) {
                    ApiService.addTransactionPending(result.txID, 'tron', await FirebaseService.getIdToken())
                }

                acceptCallback(uuid, messageUUID, result)
            } catch (err) {
                acceptCallback(uuid, messageUUID, {
                    error: err.message
                })
            }
        }

        if (transaction.coin == 'eos') {
            try {
                result = await EosService.sendAction(rawTransaction)
                acceptCallback(uuid, messageUUID, result)
            } catch (err) {
                acceptCallback(uuid, messageUUID, {
                    error: err.message
                })
            }
        }

        if (transaction.coin == 'iost') {
            try {
                result = await IostService.sendAction(rawTransaction)
                acceptCallback(uuid, messageUUID, result)

                let interval = setInterval(() => {
                    IostService.iost.currentRPC.transaction.getTxReceiptByTxHash(result).then(async res => {
                        clearInterval(interval)
                        if(res.status_code == 'SUCCESS' && FirebaseService.isLoggedIn) {
                            ApiService.addTransactionPending(res.tx_hash, 'iost', await FirebaseService.getIdToken())
                        }
                    })
                }, 1000)
            } catch (err) {
                acceptCallback(uuid, messageUUID, {
                    error: err.message
                })
            }
        }

        //LeftPanelService.ready = true
        this.transactionQueue = null
    },

    rejectTransaction(callback) {
        this.closePopup()
        //LeftPanelService.ready = true
        callback(this.transactionQueue.uuid, this.transactionQueue.messageUUID)
        this.transactionQueue = null
    },
}

export default WalletService