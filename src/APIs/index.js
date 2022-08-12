import axios from 'axios'
import { FAUCET_SERVER_URL } from '../constants/url'

export const BASE_HEADERS = {
    'Content-Type': 'application/json',
    accept: 'application/json',
}
export const faucetClient = axios.create({
    baseURL: FAUCET_SERVER_URL,
    headers: BASE_HEADERS,
})

export const getTokens = () => {
    return faucetClient.get(`/tokens`)
}
export const claimTestToken = (params) => {
    return faucetClient.post(`/api/claimTestToken`, params)
}
