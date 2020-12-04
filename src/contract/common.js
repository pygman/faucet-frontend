import Contract from 'web3-eth-contract'
import Web3 from 'web3'

import erc20Abi from './abi/test-erc20.json'
const uint256Max = `0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`

const chainList = [
    {
        // yarn build => Ethereum Ropsten Testnet
        id: 3,
        networkName: 'Ropsten',
        rpcUrl: 'https://ropsten.eth.aragon.network/',
    },
    {
        // yarn build => Ethereum Ropsten Testnet
        id: 3,
        networkName: 'Ropsten',
        rpcUrl: 'https://ropsten.eth.aragon.network/',
    },
]

const addressList = [
    {
        dai: '0x79103e2F13F46059D084C2e7fB29d9f728A82647',
        usdt: '0xc7d96C2275bC4a69371CB5B56f0052B952AB0d66',
        usdc: '0x2793A8337bB515b1641F507f7588B6B97e9ED6aF',

        ckb_chain: '',
        token_locker: '',
    },
    {
        dai: '0x79103e2F13F46059D084C2e7fB29d9f728A82647',
        usdt: '0xc7d96C2275bC4a69371CB5B56f0052B952AB0d66',
        usdc: '0x2793A8337bB515b1641F507f7588B6B97e9ED6aF',

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
