export const CONTRACT_ADDRESS = {
    EMPOW: "0xFc7B04e7A02dBEcC04931a41D12b2e8FD24a0f94",
    TRONEOS: "TJMhSbq72RQ6yfBLt1pM2wbipSgxtRkfaU",
    TRONSPIN: "TPiVCc9ZBjQtPEqUtXgM666886wxXxyJyJ",
    TRONUSDT: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    ETHEREUMEOS: "0x82420228c8635246d470f70488fe5eaec15fee0d",
    ETHEREUMSPIN: "0xb19c90ed52b7d65ff5ef03447bff3cb40bca08d6",
    ETHEREUMUSDT: "0xdac17f958d2ee523a2206206994597c13d831ec7"
}

export const MAX_APPROVE_VALUE = "115792089237316195423570985008687907853269984665640564039457584007913129639935"

export const API_ENDPOINT = "https://api.empow.io"

export const CURRENCY_SYMBOL = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
}

export const TX_API = {
    ETHEREUM: 'https://etherscan.io/tx/',
    ERC20: 'https://etherscan.io/tx/',
    TRON: 'https://tronscan.org/#/transaction/',
    TRC10: 'https://tronscan.org/#/transaction/',
    TRC20: 'https://tronscan.org/#/transaction/',
    EOS: 'https://www.eosx.io/tx/',
    EOSTOKEN: 'https://www.eosx.io/tx/',
    BITCOIN: 'https://www.blockchain.com/vi/btc/tx/',
    BINANCE: 'https://explorer.binance.org/tx/',
    BEP2: 'https://explorer.binance.org/tx/',
    RIPPLE: 'https://xrpscan.com/tx/'
}

export const NODE = {
    ETHEREUM: {
        MAINNET: {
            NAME: "mainnet",
            ID: "1",
            URL: "https://node3.web3api.com",
            SOCKET: "wss://mainnet.infura.io/ws"
        },
        ROPSTEN: {
            NAME: "ropsten",
            ID: "3",
            URL: "https://ropsten.infura.io/v3/efaf606feb424661b4119ac8dd32f7e2",
            SOCKET: "wss://ropsten.infura.io/ws"
        },
        TOMOCHAIN: {
            NAME: 'tomochain',
            ID: "88",
            URL: "https://rpc.tomochain.com",
            SOCKET: "wss://ws.tomochain.com"
        }
    },
    TRON: {
        MAINNET: {
            "fullNode" : "https://api.trongrid.io",
            "solidityNode" : "https://api.trongrid.io",
            "eventServer" : "https://api.trongrid.io"
        },
        SHASTA: {
            "fullNode" : "https://api.shasta.trongrid.io",
            "solidityNode" : "https://api.shasta.trongrid.io",
            "eventServer" : "https://api.shasta.trongrid.io"
        }
    },
    EOS: {
        MAINNET: {
            URL: "https://eos.greymass.com"
        },
        EOSLAOMAO: {
            URL: "https://api.eoslaomao.com"
        },
        EOSASIA: {
            URL: "https://geo.eosasia.one"
        },
        EOSCANNON: {
            URL: "https://mainnet.eoscannon.io"
        },
        KYLIN : {
            URL: "https://api-kylin.eoslaomao.com"
        }
    },
    BINANCE: {
        MAINNET: {
            URL: "https://dex.binance.org",
            NAME: 'mainnet'
        }
    },
    RIPPLE: {
        MAINNET: {
            URL: "wss://s1.ripple.com"
        }
    },
    IOST: {
        MAINNET: {
            URL: "https://api.iost.io",
            EXPLORER_URL: "https://explorer.iost.io"
        }
    }
}