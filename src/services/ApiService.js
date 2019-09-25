import Axios from "axios";
import { API_ENDPOINT } from '../constants/index'

const ApiService = {

    addUser(idToken) {
        return new Promise((resolve, reject) => {
            Axios.post(`${API_ENDPOINT}/user?idToken=${idToken}`, {})
                .then(res => (resolve(res.data)))
                .catch(error => (resolve(error)))
        })
    },

    addUserAddreses(listAddress, idToken) {
        return new Promise((resolve, reject) => {
            Axios.post(`${API_ENDPOINT}/user/address?idToken=${idToken}`, {
                listAddress
            })
                .then(res => (resolve(res.data)))
                .catch(error => (resolve(error)))
        })
    },

    addTransactionPending(tx, blockchainType, idToken) {

        return new Promise((resolve, reject) => {
            Axios.post(`${API_ENDPOINT}/transaction/pending?idToken=${idToken}`, {
                tx,
                blockchainType
            })
                .then(res => (resolve(res.data)))
                .catch(error => (resolve(error)))
        })
    }

}

export default ApiService