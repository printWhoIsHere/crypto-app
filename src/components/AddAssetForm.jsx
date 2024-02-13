import { useRef, useState } from 'react'
import {
	Select,
	Space,
	Divider,
	Form,
	Button,
	InputNumber,
	DatePicker,
	Result,
} from 'antd'
import { useCrypto } from '../hooks/useCrypto'
import CoinInfo from './CoinInfo'

const { Item } = Form

const styleInputNumber = {
	width: '100%',
}

const validateMessages = {
	required: '${label} is required!',
	types: {
		number: '${label} is not valid number',
	},
	number: {
		range: '{label} must be between ${min} and ${max}',
	},
}

const AddAssetForm = ({ onClose }) => {
	const [form] = Form.useForm()
	const { crypto, addAsset } = useCrypto()
	const [coin, setCoin] = useState(null)
	const [submitted, setSubmitted] = useState(false)
	const assetRef = useRef()

	if (submitted) {
		return (
			<Result
				status='success'
				title='New Asset Added'
				subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
				extra={[
					<Button type='primary' key='console' onClick={onClose}>
						Close
					</Button>,
				]}
			/>
		)
	}

	if (!coin) {
		return (
			<Select
				style={{ width: '100%' }}
				onSelect={(value) => setCoin(crypto.find((coin) => coin.id === value))}
				placeholder='Select Coin'
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
		)
	}

	const onFinish = (values) => {
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date(),
		}
		assetRef.current = newAsset
		setSubmitted(true)
		addAsset(newAsset)
	}

	const handleAmountChange = (value) => {
		const price = form.getFieldValue('price')
		form.setFieldsValue({
			total: +(value * price).toFixed(2),
		})
	}

	const handlePriceChange = (value) => {
		const amount = form.getFieldValue('amount')
		form.setFieldsValue({
			total: +(amount * value).toFixed(2),
		})
	}

	return (
		<Form
			name='basic'
			form={form}
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 10,
			}}
			style={{
				maxWidth: 600,
			}}
			initialValues={{ price: +coin.price.toFixed(2) }}
			validateMessages={validateMessages}
			onFinish={onFinish}
		>
			<CoinInfo coin={coin} />
			<Divider />

			<Item
				label='Amount'
				name='amount'
				rules={[
					{
						required: true,
						type: 'number',
						min: 0,
					},
				]}
			>
				<InputNumber
					style={styleInputNumber}
					placeholder='Enter coin amount'
					onChange={handleAmountChange}
				/>
			</Item>

			<Item label='Price' name='price'>
				<InputNumber style={styleInputNumber} onChange={handlePriceChange} />
			</Item>

			<Item label='Date & Time' name='date'>
				<DatePicker showTime />
			</Item>

			<Item label='Total' name='total'>
				<InputNumber disabled style={styleInputNumber} />
			</Item>

			<Item>
				<Button type='primary' htmlType='submit'>
					Add Asset
				</Button>
			</Item>
		</Form>
	)
}

export default AddAssetForm
