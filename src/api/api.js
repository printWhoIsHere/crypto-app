import axios from 'axios'
import { cryptoAssets, cryptoData } from './data'

const API_BASE_URL = 'https://openapiv1.coinstats.app/coins'
const API_KEY = 'xDu8mqsC1zAfPzxZmCjZfGq9AMAWdmEMjMG1yswFGpI='
const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		'X-API-KEY': API_KEY,
	},
}

const fetchCrypto = async () => {
	try {
		const response = await axios.get(API_BASE_URL, options)
		return response.data
	} catch (error) {
		console.error('Error fetching crypto data:', error)
		return cryptoData
	}
}

const fetchAssets = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(cryptoAssets)
		}, 1)
	})
}

export { fetchCrypto, fetchAssets }
