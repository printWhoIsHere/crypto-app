import { Button, Layout, Select, Space, Modal, Drawer } from 'antd'

import { useCrypto } from '../../hooks/useCrypto'
import { useEffect, useState } from 'react'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'

const { Header } = Layout

const headerStyle = {
	textAlign: 'center',
	height: 60,
	padding: '1rem',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}

const AppHeader = () => {
	const [select, setSelect] = useState(false)
	const [coin, setCoin] = useState(null)
	const [isModal, setIsModal] = useState(false)
	const [drawer, setDrawer] = useState(false)
	const { crypto } = useCrypto()

	useEffect(() => {
		const key = (event) => {
			if (event.key === '/') setSelect((prev) => !prev)
		}
		document.addEventListener('keypress', key)
		return () => {
			document.removeEventListener('keypress', key)
		}
	})

	const handleSelect = (value) => {
		setCoin(crypto.find((coin) => coin.id === value))
		setIsModal(true)
	}
	return (
		<Header style={headerStyle}>
			<Select
				style={{
					width: 250,
				}}
				open={select}
				onSelect={handleSelect}
				onClick={() => setSelect((prev) => !prev)}
				value='press / to open'
				options={crypto.map((coin) => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon,
				}))}
				optionRender={(option) => (
					<Space>
						<img
							style={{ width: 20 }}
							src={option.data.icon}
							alt={option.data.label}
						/>
						{option.data.label}
					</Space>
				)}
			/>
			<Button type='primary' onClick={() => setDrawer(true)}>
				Add Asset
			</Button>

			<Modal
				open={isModal}
				onOk={() => setIsModal(false)}
				onCancel={() => setIsModal(false)}
				footer={null}
			>
				<CoinInfoModal coin={coin} />
			</Modal>

			<Drawer
				title='Add Asset'
				width={600}
				onClose={() => setDrawer(false)}
				open={drawer}
				destroyOnClose
			>
				<AddAssetForm onClose={() => setDrawer(false)} />
			</Drawer>
		</Header>
	)
}

export default AppHeader
