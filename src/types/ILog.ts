export type ILog = {
	_id?: string
	createdAt: number
	subject: string
	networkAddress: string
	device: string
	screenSize: [number, number]
	sessionToken: string
	path: string
	action: ILogAction
}

export type ILogAction = {
	name: "clicked" | "navigated" | "focus" | "dialog" | "input"
	target: {
		label: string
		type?: string
		value?: string[]
	}
}