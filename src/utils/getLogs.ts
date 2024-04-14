const url = import.meta.env.VITE_LOG_API + "/getLogs"

export async function getLogs() {
	try {
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				action: "find",
			}),
		})
		const data = await response.json()
		if (data.error === null) {
			return data
		}
		return false
	} catch (e) {
		console.log("error", e)

		return false
	}
}

export async function deleteAllLogs() {
	try {
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				action: "deleteMany",
			}),
		})
		const data = await response.json()
		if (data.error === null) {
			return data
		}
		return false
	} catch {
		return false
	}
}
export async function deleteOneLog(id) {
	try {
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				action: "deleteOne",
				id,
			}),
		})
		const data = await response.json()
		if (data.error === null) {
			return data
		}
		return false
	} catch {
		return false
	}
}
