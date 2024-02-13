import { Table } from 'antd'
import { useCrypto } from '../hooks/useCrypto'

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: (a, b) => a.name.length - b.name.length,
		sortDirections: ['descend'],
	},
	{
		title: 'Price, $',
		dataIndex: 'price',
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		sorter: (a, b) => a.amount - b.amount,
	},
]

const AssetsTable = () => {
	const { assets } = useCrypto()

	const data = assets.map((asset) => ({
		key: asset.id,
		name: asset.name,
		price: asset.price,
		amount: asset.amount,
	}))

	return (
		<div>
			<Table pagination={false} columns={columns} dataSource={data} />
		</div>
	)
}

export default AssetsTable
