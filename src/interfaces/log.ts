export type ILog = {
	_id?: string
	action: string
	element: {
		type: string
		label: string
	}
	location?: {
		origin: string
		pathname: string
		search: string
		hash: string
	}
	time?: number
	ip?: string
	meta?: {
		innerHeight: number
		innerWidth: number
		userAgent: string
	}
	insertedAt?: string
}
