import { createContext, useState, useEffect } from 'react'
import { fetchCrypto, fetchAssets } from '../api/api'
import { persentDifference } from '../utils/utils'

const CryptoContext = createContext({
	assets: [],
	crypto: [],
	loading: false,
})

const CryptoContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false)
	const [crypto, setCrypto] = useState([])
	const [assets, setAssets] = useState([])

	const mapAssets = (assets, result) => {
		return assets.map((asset) => {
			const coin = result.find((coin) => coin.id === asset.id)
			return {
				grow: asset.price < coin.price,
				growPercent: persentDifference(asset.price, coin.price),
				totalAmoun: asset.amount * coin.price,
				totalProfit: asset.amount * coin.price - asset.amount * asset.price,
				name: coin.name,
				...asset,
			}
		})
	}

	useEffect(() => {
		async function preload() {
			setLoading(true)
			const { result } = await fetchCrypto()
			const assets = await fetchAssets()

			setAssets(mapAssets(assets, result))
			setCrypto(result)
			setLoading(false)
		}
		preload()
	}, [])

	const addAsset = (newAsset) => {
		setAssets((prev) => mapAssets([...prev, newAsset], crypto))
	}

	return (
		<CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
			{children}
		</CryptoContext.Provider>
	)
}

export { CryptoContext, CryptoContextProvider }
