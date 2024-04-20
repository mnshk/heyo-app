export type Log = {
	_id: string
	createdAt: number
	subject: string
	networkAddress: string
	device: string
	screenSize: [number, number]
	sessionToken: string
	path: string
	action: {
		name: "clicked" | "navigated" | "focus" | "dialog" | "input"
		target: {
			label: string
			type: string
			value?: string[]
		}
	}
}
