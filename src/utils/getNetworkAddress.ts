export default async function getNetworkAddress() {
	try {
		const response = await fetch("https://api.ipify.org?format=json")
		const data: { ip: string } = await response.json()
		return data.ip
	} catch {
		return false
	}
}
