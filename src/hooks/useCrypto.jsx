import { useContext } from 'react'
import { CryptoContext } from '../context/crypto-context'

const useCrypto = () => {
	return useContext(CryptoContext)
}

export { useCrypto }
