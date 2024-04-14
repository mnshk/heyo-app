export default async function sendLog(payload: any) {
	const url = import.meta.env.VITE_LOG_API + "/log"
	if (url === undefined) {
		return false
	}
	try {
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				...payload,
				location: location.href,
				time: Date.now(),
			}),
		})
		const data = await response.json()
		if (data.error === null) {
			return true
		}
		return false
	} catch {
		return false
	}
}
