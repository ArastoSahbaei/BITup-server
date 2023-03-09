import BTCPayService from '../../shared/api/services/BTCPayService'
import UserModel from '../models/User.model'

export const createNewStore = async (storeName: string) => {
	try {
		const { data } = await BTCPayService.createStore({ name: storeName, defaultCurrency: 'SEK', defaultLang: 'sv' })
		return data
	} catch (error) {
		console.log(error)
		return false
	}
}

export const isEmailOccupied = async (email: string) => {
	try {
		const isEmailOccupied = await UserModel.findOne({ email: email })
		return !!isEmailOccupied
	} catch (error) {
		return false
	}
}

const changeExchangeRate = async (request, response) => {
	//TODO: implement
}

const addWallet = async (request, response) => {
	//TODO: implement
}

