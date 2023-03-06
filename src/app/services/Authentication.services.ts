import BTCPayService from '../../shared/api/services/BTCPayService'

export const createNewStore = async (storeName: string) => {
	try {
		const { data } = await BTCPayService.createStore({ name: storeName, defaultCurrency: 'SEK', defaultLang: 'sv' })
		return data
	} catch (error) {
		console.log(error)
		return false
	}
}