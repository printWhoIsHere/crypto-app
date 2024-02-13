import { Layout, Typography } from 'antd'
import { useCrypto } from '../../hooks/useCrypto'
import PortolioChart from '../PortolioChart'
import AssetsTable from '../AssetsTable'

const { Content } = Layout

const contentStyle = {
	textAlign: 'center',
	minHeight: 'calc(100vh - 60px)',
	lineHeight: '120px',
	color: '#fff',
	padding: 10,
	backgroundColor: '#001529',
}

const AppContent = () => {
	const { assets, crypto } = useCrypto()

	const cryptoPriceMap = crypto.reduce((acc, coin) => {
		acc[coin.id] = coin.price
		return acc
	}, {})

	return (
		<Content style={contentStyle}>
			<Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
				Portfolio:{' '}
				{assets
					.map((asset) => asset.amount * cryptoPriceMap[asset.id])
					.reduce((acc, value) => (acc += value), 0)
					.toFixed(2)}
				$
			</Typography.Title>
			<PortolioChart />
			<AssetsTable />
		</Content>
	)
}

export default AppContent
