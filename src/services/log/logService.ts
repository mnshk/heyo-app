import { ILog } from "../../types/Log"

const logService = {
	async api(body: unknown) {
		let response = {
			error: {
				hasError: false,
				errorCode: "",
				errorMessage: "",
			},
			payload: {},
		}
		try {
			const baseURL = import.meta.env.VITE_LOG_API

			if (typeof baseURL !== "string" || baseURL === "") {
				throw new Error("NO_BASE_URL")
			}
			const url = baseURL + "/log"
			const res = await fetch(url, {
				method: "POST",
				body: JSON.stringify(body),
			})
			response = await res.json()
		} catch (e) {
			if (e instanceof Error) {
				response.error.errorCode = e.message
			} else {
				response.error.hasError = true
				response.error.errorMessage = "Unable to reach the server"
			}
		}
		return response
	},
	async send(payload: ILog) {
		const updatedPayload: ILog = {
			...payload,
			time: Date.now(),
			ip: sessionStorage.getItem("ip") ?? "NO_IP",
			meta: {
				innerHeight,
				innerWidth,
				userAgent: navigator.userAgent,
			},
			location: {
				origin: window.location.origin,
				pathname: window.location.pathname,
				hash: window.location.hash,
				search: window.location.search,
			},
		}

		console.log(updatedPayload)

		return this.api({
			action: "insertOne",
			payload: updatedPayload,
		})
	},
	get() {
		return this.api({
			action: "find",
		})
	},
	delete(_id: string) {
		return this.api({
			action: "deleteOne",
			payload: { _id },
		})
	},
	deleteAll() {
		return this.api({
			action: "deleteMany",
		})
	},
}

export default logService
