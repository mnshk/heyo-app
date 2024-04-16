import { Outlet, useLocation } from "react-router-dom"
import logService from "../utils/logService"
import Thinking from "../pages/Thinking"
import { useEffect, useRef } from "react"
import fetchIP from "../utils/fetchIP"
import { clickLogger, visibilityLogger } from "../utils/loggers"

export default function RouteMiddleware() {
	const middleware = useRef<HTMLDivElement>(null)
	const location = useLocation()
	fetchIP()

	useEffect(() => {
		const wrapper = middleware.current
		if (wrapper !== null) {
			wrapper.addEventListener("click", clickLogger)
			addEventListener("visibilitychange", visibilityLogger)

			return () => {
				wrapper.removeEventListener("click", clickLogger)
				removeEventListener("visibilitychange", visibilityLogger)
			}
		}
	}, [])

	useEffect(() => {
		logService.send({
			action: "Rendering",
			element: {
				type: "",
				label: location.pathname,
			},
		})
	})

	return (
		<div className="flex flex-grow" ref={middleware}>
			<Outlet />
			<Thinking />
		</div>
	)
}
