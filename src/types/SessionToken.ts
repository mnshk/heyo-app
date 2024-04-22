export type ISessionToken = {
	_id: string
	sessionToken: string
	subject: string
	isActive: boolean
	shouldAutoExpire: boolean
	createdAt: number
	lastUsedAt: number
	usage: {
		timestamp: number
		networkAddress: string
		device: string
	}[]
}
