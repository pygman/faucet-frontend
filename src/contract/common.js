import Contract from 'web3-eth-contract'
import Web3 from 'web3'

import erc20Abi from './abi/test-erc20.json'
const uint256Max = `0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`

const chainList = [
    {
        // yarn build => Ethereum Rinkeby Testnet
        id: 4,
        networkName: 'Rinkeby',
        rpcUrl: 'https://rinkeby.eth.aragon.network/',
    },
    {
        // yarn build => Ethereum Rinkeby Testnet
        id: 4,
        networkName: 'Rinkeby',
        rpcUrl: 'https://rinkeby.eth.aragon.network/',
    },
]

// {"daiContractAddr":"0xC4401D8D5F05B958e6f1b884560F649CdDfD9615","usdtContractAddr":"0x1cf98d2a2f5b0BFc365EAb6Ae1913C275bE2618F","usdcContractAddr":"0x1F0D2251f51b88FaFc90f06F7022FF8d82154B1a"}
const addressList = [
    {
        dai: '0x7Af456bf0065aADAB2E6BEc6DaD3731899550b84',
        usdt: '0x74a3dbd5831f45CD0F3002Bb87a59B7C15b1B5E6',
        usdc: '0x265566D4365d80152515E800ca39424300374A83',
        wbtc: '0x14B980AE9990391DF946fBA440A9ac88E28DB10c',

        ckb_chain: '',
        token_locker: '',
    },
    {
        dai: '0x7Af456bf0065aADAB2E6BEc6DaD3731899550b84',
        usdt: '0x74a3dbd5831f45CD0F3002Bb87a59B7C15b1B5E6',
        usdc: '0x265566D4365d80152515E800ca39424300374A83',
        wbtc: '0x14B980AE9990391DF946fBA440A9ac88E28DB10c',

        ckb_chain: '',
        token_locker: '',
    },
]

const chain =
    process.env.REACT_APP_ENV === 'production' ? chainList[0] : chainList[1]

const address =
    process.env.REACT_APP_ENV === 'production' ? addressList[0] : addressList[1]

const web3 = window.web3
    ? new Web3(window.web3.currentProvider)
    : new Web3(new Web3.providers.HttpProvider(chain.rpcUrl))

let contracts = null

const init = () => {
    if (contracts !== null) {
        return
    }
    Contract.setProvider(window.ethereum || chain.rpcUrl)
    contracts = JSON.parse(JSON.stringify(address))

    // eslint-disable-next-line array-callback-return
    Object.keys(contracts).map((key) => {
        if (key !== '') {
            contracts[key] = new Contract(erc20Abi, address[key])
        }
    })
}

const receipt = (transactionHash) => {
    return new Promise((resolve) => {
        if (!transactionHash) {
            resolve(null)
        }
        web3.eth.getTransactionReceipt(transactionHash, (_, data) => {
            resolve(data)
        })
    })
}

export { address, chain, contracts, init, receipt, uint256Max, web3 }
