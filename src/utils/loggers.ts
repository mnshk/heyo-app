import logService from "../services/log/logService"

export function clickLogger(e: MouseEvent) {
	const target = e.target as HTMLElement
	logService.create({
		name: "clicked",
		target: {
			type: target.nodeName,
			label: target.innerText.trim() === "" ? target.title : target.innerText,
		},
	})
}

export function visibilityLogger() {
	logService.create({
		name: "focus",
		target: {
			type: "",
			label: document.visibilityState,
		},
	})
}
