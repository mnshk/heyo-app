export default async function fetchIP() {
	const res = await fetch("https://api.ipify.org?format=json")
	const data = (await res.json()) as { ip: string }
	sessionStorage.setItem("ip", data.ip)
	return data.ip
}
