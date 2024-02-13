const generateId = () =>
	Math.random().toString(16).slice(2) + new Date().getTime().toString(36)

const persentDifference = (a, b) => {
	return +(100 * Math.abs((a - b) / (a + b / 2))).toFixed(2)
}

const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.substr(1)
}

const randomColor = () => {
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)
	return `rgba(${r},${g},${b},.8)`
}

export { generateId, persentDifference, capitalize, randomColor }
