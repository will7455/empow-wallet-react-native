import Utils from '../utils/utils'
import AsyncStorage from '@react-native-community/async-storage';

const StorageService = {
    storageKey: [
        'accounts',
        'mnemonic',
        'tokens',
        'setting',
        'whitelist'
    ],
    accounts: null,
    mnemonic: null,
    whitelist: {},
    setting: {
        showZeroBalance: true,
        showLeftPanel: true,
        listCoinDisabled: {},
        currency: 'usd',
        autolock: 1 * 60 * 1000, // 1 minute
        network: {
            'ETHEREUM': 'MAINNET',
            'TRON': 'MAINNET',
            'EOS': 'MAINNET',
            'BINANCE': 'MAINNET',
            'RIPPLE': 'MAINNET'
        },
    },
    tokens: [
        {
            type: "ERC20",
            contractAddress: "0xfc7b04e7a02dbecc04931a41d12b2e8fd24a0f94",
            name: "EMPOW",
            symbol: "EM",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
            name: "USDT ERC20",
            symbol: "USDT",
            decimal: 6,
        },
        {
            type: "TRC20",
            contractAddress: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
            name: "USDT TRC20",
            symbol: "USDT",
            decimal: 6,
        },
        {
            type: "TRC10",
            id: "1002000",
            contractAddress: "1002000",
            name: "BitTorrent",
            symbol: "BTT",
            decimal: 6,
        },
        {
            type: "TRC20",
            contractAddress: "TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7",
            name: "WINK",
            symbol: "WIN",
            decimal: 6,
            
        },
        {
            type: "TRC20",
            contractAddress: "TNYNLRkqq956bQc2buvoLbaLgh25RkJMiN",
            name: "TRONAce",
            symbol: "ACE",
            decimal: 6,
        },
        {
            type: "TRC20",
            contractAddress: "TNisVGhbxrJiEHyYUMPxRzgytUtGM7vssZ",
            name: "TronVegasCoin",
            symbol: "VCOIN",
            decimal: 6,
        },
        {
            type: "EOSTOKEN",
            contractAddress: "thepeostoken",
            name: "PEOS",
            symbol: "PEOS",
            decimal: 4,
            memo: true
        },
        {
            type: "EOSTOKEN",
            contractAddress: "whaleextoken",
            name: "WhaleEx",
            symbol: "WAL",
            decimal: 3,
            memo: true
        },
        {
            type: "EOSTOKEN",
            contractAddress: "okkkkkkkkkkk",
            name: "Yakee chain",
            symbol: "YKC",
            decimal: 4,
            memo: true
        },
        {
            type: "EOSTOKEN",
            contractAddress: "athenastoken",
            name: "ATHENA",
            symbol: "ATHENA",
            decimal: 4,
            memo: true
        },
        {
            type: "EOSTOKEN",
            contractAddress: "eosede1token",
            name: "EDE",
            symbol: "EDE",
            decimal: 3,
            memo: true
        },
        {
            type: "EOSTOKEN",
            contractAddress: "eosiomeetone",
            name: "MEET.ONE",
            symbol: "MEETONE",
            decimal: 4,
            memo: true
        },
        {
            type: "EOSTOKEN",
            contractAddress: "eosiotptoken",
            name: "TokenPocket",
            symbol: "TPT",
            decimal: 4,
            memo: true
        },
        {
            type: "EOSTOKEN",
            contractAddress: "mkstaketoken",
            name: "KEY",
            symbol: "KEY",
            decimal: 3,
            memo: true
        },
        {
            type: "EOSTOKEN",
            contractAddress: "eosdragontkn",
            name: "Dragon Option",
            symbol: "DRAGON",
            decimal: 4,
            memo: true
        },
        {
            type: "ERC20",
            contractAddress: "0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3",
            name: "Bitfinex LEO Token",
            symbol: "LEO",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
            name: "ChainLink Token",
            symbol: "LINK",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
            name: "Maker",
            symbol: "MKR",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",
            name: "Crypto.com Chain",
            symbol: "CRO",
            decimal: 8,
        },
        {
            type: "ERC20",
            contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            name: "USD Coin",
            symbol: "USDC",
            decimal: 6,
        },
        {
            type: "ERC20",
            contractAddress: "0xc9859fccc876e6b4b3c749c5d29ea04f48acb74f",
            name: "Ino Coin",
            symbol: "INO",
            decimal: 0,
        },
        {
            type: "ERC20",
            contractAddress: "0xd850942ef8811f2a866692a623011bde52a462c1",
            name: "VeChain",
            symbol: "VEN",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
            name: "BAT",
            symbol: "BAT",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x8e1b448ec7adfc7fa35fc2e885678bd323176e34",
            name: "Egretia",
            symbol: "EGT",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xf1290473e210b2108a85237fbcd7b6eb42cc654f",
            name: "HEDG",
            symbol: "HEDG",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x6f259637dcd74c767781e37bc6133cd6a68aa161",
            name: "HuobiToken",
            symbol: "HT",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
            name: "OmiseGO",
            symbol: "OMG",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x0000000000085d4780B73119b644AE5ecd22b376",
            name: "TrueUSD",
            symbol: "TUSD",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x8e870d67f660d95d5be530380d0ec0bd388289e1",
            name: "Paxos Standard",
            symbol: "PAX",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x039b5649a59967e3e936d7471f9c3700100ee1ab",
            name: "Kucoin Shares",
            symbol: "KCS",
            decimal: 6,
        },
        {
            type: "ERC20",
            contractAddress: "0x6c6ee5e31d828de241282b9606c8e98ea48526e2",
            name: "HoloToken",
            symbol: "HOT",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xa15c7ebe1f07caf6bff097d8a589fb8ac49ae5b3",
            name: "Pundi X Token",
            symbol: "NPXS",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xf3586684107ce0859c44aa2b2e0fb8cd8731a15a",
            name: "KaratBank Coin",
            symbol: "KBC",
            decimal: 7,
        },
        {
            type: "ERC20",
            contractAddress: "0xe41d2489571d322189246dafa5ebde1f4699f498",
            name: "ZRX",
            symbol: "ZRX",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x9ab165d795019b6d8b3e971dda91071421305e5a",
            name: "Aurora",
            symbol: "AOA",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xb5a5f22694352c15b00323844ad545abb2b11028",
            name: "ICON",
            symbol: "ICX",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
            name: "Reputation",
            symbol: "REP",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xfa1a856cfa3409cfa145fa4e20eb270df3eb21ab",
            name: "IOSToken",
            symbol: "IOST",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x1602af2c782cc03f9241992e243290fccf73bb13",
            name: "Qubitica",
            symbol: "QBIT",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xcb97e65f07da24d46bcdd078ebebd7c6e6e3d750",
            name: "Bytom",
            symbol: "BTM",
            decimal: 8,
        },
        {
            type: "ERC20",
            contractAddress: "0x3883f5e181fccaf8410fa61e12b59bad963fb645",
            name: "Theta Token",
            symbol: "THETA",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x8971f9fd7196e5cee2c1032b50f656855af7dd26",
            name: "Lambda",
            symbol: "LAMB",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xbab165df9455aa0f2aed1f2565520b91ddadb4c8",
            name: "EDUCare",
            symbol: "EKT",
            decimal: 8,
        },
        {
            type: "ERC20",
            contractAddress: "0x17aa18a4b64a55abed7fa543f2ba4e91f2dce482",
            name: "Insight Chain",
            symbol: "INB",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xa974c709cfb4566686553a20790685a47aceaa33",
            name: "Mixin",
            symbol: "XIN",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x4a220e6096b25eadb88358cb44068a3248254675",
            name: "Quant",
            symbol: "QNT",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x05f4a42e251f2d52b8ed15e9fedaacfcef1fad27",
            name: "Zilliqa",
            symbol: "ZIL",
            decimal: 12,
        },
        {
            type: "ERC20",
            contractAddress: "0x408e41876cccdc0f92210600ef50372656052a38",
            name: "Republic",
            symbol: "REN",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d",
            name: "Aeternity",
            symbol: "AE",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xF29226914595052a04F5AFbe6410D0C3eD707548",
            name: "NEXT",
            symbol: "NET",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
            name: "Dai Stablecoin v1.0",
            symbol: "DAI",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74",
            name: "Walton",
            symbol: "WTC",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x744d70fdbe2ba4cf95131626614a1763df805b9e",
            name: "StatusNetwork",
            symbol: "SNT",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xb63b606ac810a52cca15e44bb630fd42d8d1d83d",
            name: "Crypto.com",
            symbol: "MCO",
            decimal: 8,
        },
        {
            type: "ERC20",
            contractAddress: "0x0f8c45b896784a1e408526b9300519ef8660209c",
            name: "XMAX",
            symbol: "XMX",
            decimal: 8,
        },
        {
            type: "ERC20",
            contractAddress: "0x37f04d2c3ae075fad5483bb918491f656b12bdb6",
            name: "Vestchain",
            symbol: "VEST",
            decimal: 8,
        },
        {
            type: "ERC20",
            contractAddress: "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206",
            name: "Nexo",
            symbol: "NEXO",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x3543638ed4a9006e4840b105944271bcea15605d",
            name: "UNetworkToken",
            symbol: "UUU",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c",
            name: "EnjinCoin",
            symbol: "ENJ",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xbf2179859fc6d5bee9bf9158632dc51678a4100e",
            name: "ELF",
            symbol: "ELF",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0xa74476443119A942dE498590Fe1f2454d7D4aC0d",
            name: "Golem",
            symbol: "GNT",
            decimal: 18,
        },
        {
            type: "ERC20",
            contractAddress: "0x39bb259f66e1c59d5abef88375979b4d20d98022",
            name: "WAX Token",
            symbol: "WAX",
            decimal: 8,
        },
        {
            type: "ERC20",
            contractAddress: "0x8e766f57f7d16ca50b4a0b90b88f6468a09b0439",
            name: "Maximine Coin",
            symbol: "MXM",
            decimal: 18,
        },
        {
            type: "TRC20",
            contractAddress: "TVQ6jYV5yTtRsKcD8aRc1a4Kei4V45ixLn",
            name: "IG Gold",
            symbol: "IGG",
            decimal: 6,
        },
        {
            type: "TRC20",
            contractAddress: "TLvDJcvKJDi3QuHgFbJC6SeTj3UacmtQU3",
            name: "888Tron",
            symbol: "888",
            decimal: 6,
        },
        {
            type: "TRC20",
            contractAddress: "TUL5yxRKeSWvceLZ3BSU5iNJcQmNxkWayh",
            name: "Vena",
            symbol: "vena",
            decimal: 6,
        },
        {
            type: "TRC10",
            id: "1002380",
            contractAddress: "1002380",
            name: "ATT",
            symbol: "ATT",
            decimal: 0,
        },
        {
            type: "TRC10",
            id: "1000001",
            contractAddress: "1000001",
            name: "SEED",
            symbol: "SEED",
            decimal: 0,
        },
        {
            type: "TRC20",
            contractAddress: "TZGQJY1QbZuXJmMgDgoZVeG4mD1Ef6SdWU",
            name: "TRON UP",
            symbol: "UP",
            decimal: 6,
        },
        {
            type: "TRC20",
            contractAddress: "TKTcfBEKpp5ZRPwmiZ8SfLx8W7CDZ7PHCY",
            name: "TRONWALLET",
            symbol: "TWX",
            decimal: 6,
        },
        {
            type: "TRC20",
            contractAddress: "TWvF96qcaNTmyJ8A9jc2DbT4Na26J365Yd",
            name: "New TronFun Token ",
            symbol: "NFUN", 
            decimal: 6,
        },
        {
            type: "TRC10",
            id: "1001943",
            contractAddress: "1001943",
            name: "POPPY",
            symbol: "POPPY",
            decimal: 6,
        },
        {
            type: "TRC10",
            id: "1001313",
            contractAddress: "1001313",
            name: "CryptoGuyInZA",
            symbol: "CGIZA",
            decimal: 6,
        },
        {
            type: "TRC20",
            contractAddress: "TNq5PbSssK5XfmSYU4Aox4XkgTdpDoEDiY",
            name: "TronWeeklyJournal",
            symbol: "TWJ",
            decimal: 8,
        },
        {
            type: "TRC10",
            id: "1001090",
            contractAddress: "1001090",
            name: "TRONONE",
            symbol: "TONE",
            decimal: 0,
        },
        {
            type: "TRC10",
            id: "1001316",
            contractAddress: "1001316",
            name: "TronSociety",
            symbol: "TSY",
            decimal: 0,
        },
        {
            type: "TRC10",
            id: "1000322",
            contractAddress: "1000322",
            name: "CommunityNodeToken",
            symbol: "TRUC",
            decimal: 0,
        },
        {
            type: "TRC10",
            id: "1000226",
            contractAddress: "1000226",
            name: "TRONEuropeRewardCoin",
            symbol: "TERC",
            decimal: 0,
        },
        {
            type: "ERC20",
            contractAddress: "0x4290563c2d7c255b5eec87f2d3bd10389f991d68",
            name: "UnlimitedIP Token",
            symbol: "UIP",
            decimal: 18,
        },
        {
            type: "BEP2",
            contractAddress: "USDSB-1AC",
            name: "USDS",
            symbol: "USDSB",
            decimal: 4,
            memo: true
        },
        {
            type: "BEP2",
            contractAddress: "TUSDB-888",
            name: "TrueUSD",
            symbol: "TUSDB",
            decimal: 4,
            memo: true
        },
        {
            type: "BEP2",
            contractAddress: "PLG-D8D",
            name: "Pledge Coin",
            symbol: "CCCX",
            decimal: 4,
            memo: true
        },
        {
            type: "BEP2",
            contractAddress: "HYN-F21",
            name: "Hyperion Token",
            symbol: "HYN",
            decimal: 4,
            memo: true
        },
        {
            type: "BEP2",
            contractAddress: "COS-2E4",
            name: "Contentos",
            symbol: "COS",
            decimal: 4,
            memo: true
        },
        {
            type: "BEP2",
            contractAddress: "NEW-09E",
            name: "NEWTON",
            symbol: "NEW",
            decimal: 4,
            memo: true
        },
        {
            type: "BEP2",
            contractAddress: "MATIC-84A",
            name: "Matic Token",
            symbol: "MATIC",
            decimal: 4,
            memo: true
        },
        {
            type: "BEP2",
            contractAddress: "ONE-5F9",
            name: "Harmony One",
            symbol: "ONE",
            decimal: 4,
            memo: true
        },
        {
            type: "BEP2",
            contractAddress: "BTCB-1DE",
            name: "Bitcoin BEP2",
            symbol: "BTCB",
            decimal: 4,
            memo: true
        },
        {
            type: "BEP2",
            contractAddress: "TOP-491",
            name: "TOP Network",
            symbol: "TOP",
            decimal: 4,
            memo: true
        },
        {
            type: "BEP2",
            contractAddress: "EVT-49B",
            name: "everiToken",
            symbol: "EVT",
            decimal: 4,
            memo: true
        },
        {
            type: "BEP2",
            contractAddress: "CHZ-ECD",
            name: "Chiliz",
            symbol: "CHZ",
            decimal: 4,
            memo: true
        },
    ],
    password: false,
    //ready: false,
    init(password) {
        this.password = password
        //this.ready = true
        this.saveAll()
    },
    getStorage(key) {
        return AsyncStorage.getItem(key)
    },

    async dataExists() {
        return !!(await this.getStorage('accounts'));
    },

    async unlock (password) {
        return new Promise( async (resolve, reject) => {
            //if(this.ready) return reject('Wallet has unlocked')
            if(!this.dataExists) return reject('Data not exist')

            try {
                for(var i = 0; i < this.storageKey.length; i++) {
                    let key = this.storageKey[i];
                    const encrypted = await this.getStorage(key);
    
                    if(!encrypted)
                        continue;
    
                    this[ key ] = Utils.decrypt(
                        encrypted,
                        password
                    )

                }
                
                //this.ready = true
                this.password = password

                resolve(true)
            } catch (error) {
                reject('Password not correct')
            }
        })
    },

    async addToken(type, address, name, symbol, decimal) {
        return new Promise( (resolve, reject) => {
            // check exist type
            if(!this.token.hasOwnProperty(type)) return reject(`${type} is not exist`)
            // check exist symbol
            const symbolLower = symbol.toLowerCase()
            if(this.token[type].hasOwnProperty(symbolLower)) return reject(`${name} already exist. You need remove and add again`)
            // add
            this.token[type][symbolLower] = {
                address,
                name,
                symbol: symbol.toUpperCase(),
                decimal
            }

            this.saveToken()

            resolve(true)
        })
    },

    async removeToken(type, symbol) {
        return new Promise( (resolve, reject) => {
            try {
                delete this.token[type][symbol.toLowerCase()]
            } catch (err) {
                reject(`Can't remove ${symbol}: ${err.message}`)
            }
        })
    },

    updateEosAddress(address) {
        //if(!this.ready) return;

        this.accounts.eosActive.address = address
        this.accounts.eosOwner.address = address

        this.saveAccounts()
    },

    addWhitelist (contractAddress, timeExpired) {
        this.whitelist[contractAddress] = timeExpired
        this.saveWhitelist()
    },

    checkWhitelist (contractAddress) {
        if(!this.whitelist.hasOwnProperty(contractAddress)) return false;
        const timeExpired = this.whitelist[contractAddress]
        if(typeof timeExpired != 'number') return false;
        if(timeExpired == -1) return true;

        const now = new Date().getTime()

        if(now > timeExpired) {
            delete this.whitelist[contractAddress]
            return false;
        }

        return true;
    },

    saveAll() {
        this.saveAccounts()
        this.saveMnemonic()
        this.saveTokens()
        this.saveSetting()
        this.saveWhitelist()
    },

    saveWhitelist () {
        this.save('whitelist')
    },

    saveAccounts (accounts = null) {
        if(accounts) this.accounts = accounts
        this.save('accounts')
    },

    saveMnemonic (mnemonic = null) {
        if(mnemonic) this.mnemonic = mnemonic
        this.save('mnemonic')
    },

    saveTokens () {
        this.save('tokens')
    },
    
    saveSetting () {
        this.save('setting')
    },

    save(key) {
        //if(!this.ready) throw new Error("Storage service not ready")
        AsyncStorage.setItem(
            key, Utils.encrypt(this[ key ], this.password)
        )
    }
}

export default StorageService