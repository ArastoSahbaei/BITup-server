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

export const isStoreNameOccupied = async (storeName: string) => {
	try {
		const isStoreNameOccupied = await UserModel.findOne({ 'store.name': storeName })
		return !!isStoreNameOccupied
	} catch (error) {
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

export const addWallet = async (storeId: string) => {
	//requires the BTCPay server to already have a BTC wallet configured
	try {
		const { data } = await BTCPayService.connectWalletToStore(storeId)
		console.log(data)
		return !!data
	} catch (error) {
		console.log(error)
		return false
	}
}


export const changeExchangeRate = async (storeId: string) => {
	try {
		const { data } = await BTCPayService.updateStoreRateSettings(storeId)
		return !!data
	} catch (error) {
		console.log(error)
		return false
	}
}

export const addWebHooks = async (storeId: string) => {
	try {
		const { data } = await BTCPayService.createWebHook(storeId)
		console.log('CREATED WEBHOOK FOR STORE: ' + storeId)
		console.log(data)
		return data
	} catch (error) {
		console.log(error)
		return false
	}
}