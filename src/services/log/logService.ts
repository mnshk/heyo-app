import { ILog, ILogAction } from "@/types/Log.ts"

type ILogRequestBody = {
	action: "create" | "read" | "delete"
	payload?: { deleteKey?: string; deleteValue?: string } | ILog
}

const logService = {
	async api(body: ILogRequestBody) {
		try {
			const baseURL = import.meta.env.VITE_API_URL
			if (baseURL === undefined) {
				throw new Error("baseURL undefined")
			}
			const result = await fetch(baseURL + "/logs", {
				method: "POST",
				body: JSON.stringify(body),
			})
			return await result.json()
		} catch {
			return false
		}
	},
	create(action: ILogAction) {
		const payload: ILog = {
			createdAt: Date.now(),
			subject: sessionStorage.getItem("subject")!,
			networkAddress: sessionStorage.getItem("networkAddress")!,
			sessionToken: sessionStorage.getItem("sessionToken")!,
			device: navigator.userAgent,
			path: location.href,
			screenSize: [innerWidth, innerHeight],
			action,
		}
		return this.api({ action: "create", payload })
	},
	get() {
		return this.api({ action: "read" })
	},
	delete(deleteKey: string, deleteValue: string) {
		return this.api({
			action: "delete",
			payload: { deleteKey, deleteValue },
		})
	},
}
export default logService
