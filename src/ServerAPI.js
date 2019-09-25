import Axios from "axios";
import { API_ENDPOINT } from './constants/index'

const ServerAPI = {
    getUserPoint(idToken) {
        console.log(idToken)
        return new Promise((resolve, reject) => {
            Axios.get(`${API_ENDPOINT}/user/point?idToken=${idToken}`)
                .then(res => (resolve(res.data.value)))
                .catch(error => (reject(error.response.data)))
        })
    },

    getDApp() {
        return new Promise((resolve, reject) => {
            Axios.get(`${API_ENDPOINT}/dapp?page=1&pageSize=100`)
                .then(res => (resolve(res.data)))
                .catch(error => (reject(error.response.data)))
        })
    },

    getUserAddress(blockchainType, idToken) {
        return new Promise((resolve, reject) => {
            Axios.get(`${API_ENDPOINT}/user/address/${blockchainType}?idToken=${idToken}`)
                .then(res => (resolve(res.data)))
                .catch(error => (reject(error.response.data)))
        })
    },

    getWithdrawPointHistories(idToken) {
        return new Promise((resolve, reject) => {
            Axios.get(`${API_ENDPOINT}/user/withdrawPointHistories?idToken=${idToken}`)
                .then(res => (resolve(res.data)))
                .catch(error => (reject(error.response.data)))
        })
    },

    updateSelectedAddress(address, idToken) {
        return new Promise((resolve, reject) => {
            Axios.put(`${API_ENDPOINT}/user/address/selected?idToken=${idToken}`, {
                address
            })
                .then(res => (resolve(res.data)))
                .catch(error => (reject(error.response.data)))
        })
    },

    createWithdrawPointPending(idToken) {
        return new Promise((resolve, reject) => {
            Axios.post(`${API_ENDPOINT}/user/withdrawPointPending?idToken=${idToken}`, {})
                .then(res => (resolve(res.data)))
                .catch(error => (reject(error.response.data)))
        })
    },

    getPriceEmpow() {
        return new Promise((resolve, reject) => {
            Axios.get(`${API_ENDPOINT}/price/empow`)
                .then(res => (resolve(res.data)))
                .catch(error => (reject(error.response.data)))
        })
    }
}

export default ServerAPI;