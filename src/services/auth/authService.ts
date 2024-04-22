type IBody = {
	action: "validate" | "create" | "delete" | "update" | "read"
	payload?: IPayload
}
type IPayload = {
	_id?: string
	sessionToken?: string
	subject?: string
	isActive?: boolean
	shouldAutoExpire?: boolean
	networkAddress?: string
	device?: string
}

const authService = {
	async api(body: IBody) {
		try {
			const baseURL = import.meta.env.VITE_API_URL
			if (baseURL === undefined) {
				throw new Error("baseURL undefined")
			}
			const result = await fetch(baseURL + "/auth", {
				method: "POST",
				body: JSON.stringify(body),
			})
			return await result.json()
		} catch {
			return
		}
	},
	validate(sessionToken: string, networkAddress: string): Promise<{ subject: string } | undefined> {
		return this.api({
			action: "validate",
			payload: {
				sessionToken,
				device: navigator.userAgent,
				networkAddress: networkAddress,
			},
		})
	},
	read() {
		return this.api({ action: "read" })
	},
	create(sessionToken: string, subject: string, shouldAutoExpire: boolean) {
		return this.api({
			action: "create",
			payload: {
				sessionToken,
				subject,
				shouldAutoExpire,
			},
		})
	},
	delete(_id: string) {
		return this.api({ action: "delete", payload: { _id } })
	},
	update({
		_id,
		isActive,
		sessionToken,
		subject,
		shouldAutoExpire,
	}: {
		_id: string
		isActive?: boolean
		sessionToken?: string
		subject?: string
		shouldAutoExpire?: boolean
	}) {
		return this.api({
			action: "delete",
			payload: {
				_id,
				isActive,
				sessionToken,
				subject,
				shouldAutoExpire,
			},
		})
	},
}
export default authService
