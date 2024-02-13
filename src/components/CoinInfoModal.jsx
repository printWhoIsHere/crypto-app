import { Divider, Tag, Typography } from 'antd'
import CoinInfo from './CoinInfo'

const { Paragraph, Text } = Typography

const CoinInfoModal = ({ coin }) => {
	return (
		<>
			<CoinInfo coin={coin} withSymbol={coin.symbol} />
			<Divider />
			<Paragraph>
				<Text style={{ marginRight: 10 }}>1 hour:</Text>
				<Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
					{coin.priceChange1h}%
				</Tag>
				<Text style={{ marginRight: 10 }}>1 day:</Text>
				<Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
					{coin.priceChange1d}%
				</Tag>
				<Text style={{ marginRight: 10 }}>1 week:</Text>
				<Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
					{coin.priceChange1w}%
				</Tag>
			</Paragraph>
			<Paragraph>
				<Text style={{ marginRight: 10 }}>Price:</Text>
				{coin.price.toFixed(2)}$
			</Paragraph>
			<Paragraph>
				<Text style={{ marginRight: 10 }}>Price BTC:</Text>
				{coin.priceBtc.toFixed(2)}
			</Paragraph>
			<Paragraph>
				<Text style={{ marginRight: 10 }}>Market Cap:</Text>
				{coin.marketCap.toFixed(2)}$
			</Paragraph>
			{coin.contractAddress && (
				<Paragraph>
					<Text style={{ marginRight: 10 }}>Contract Address:</Text>
					{coin.contractAddress}
				</Paragraph>
			)}
		</>
	)
}

export default CoinInfoModal
