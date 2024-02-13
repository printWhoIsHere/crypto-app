import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useCrypto } from '../hooks/useCrypto'
import { randomColor } from '../utils/utils'

ChartJS.register(ArcElement, Tooltip, Legend)

const PortolioChart = () => {
	const { assets } = useCrypto()

	const colors = assets.map(() => randomColor())
	const data = {
		labels: assets.map((asset) => asset.name),
		datasets: [
			{
				label: '$',
				data: assets.map((asset) => asset.totalAmoun),
				backgroundColor: colors,
				borderColor: colors,
			},
		],
	}

	return (
		<div
			style={{
				height: 400,
				display: 'flex',
				justifyContent: 'center',
				marginBottom: '1rem',
			}}
		>
			<Pie data={data} />
		</div>
	)
}

export default PortolioChart
