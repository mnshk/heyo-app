import logService from "../services/log/logService"

export function clickLogger(e: MouseEvent) {
	const target = e.target as HTMLElement

	logService.send({
		action: "Clicked",
		element: {
			type: target.nodeName,
			label: target.innerText.trim() === "" ? target.title : target.innerText,
		},
	})
}

export function visibilityLogger() {
	console.log("visibility")

	logService.send({
		action: "Visibility",
		element: {
			type: "",
			label: document.visibilityState,
		},
	})
}
