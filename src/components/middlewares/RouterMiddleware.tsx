import { useEffect, useRef } from "react"
import { Outlet } from "react-router-dom"
import Thinking from "../Thinking"
import getNetworkAddress from "../../utils/getNetworkAddress"
import { clickLogger, visibilityLogger } from "../../utils/loggers"

export default function RouteMiddleware() {
	const middleware = useRef<HTMLDivElement>(null)
	// const location = useLocation()
	getNetworkAddress()

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

	// useEffect(() => {
	// 	logService.send({
	// 		action: "Rendering",
	// 		element: {
	// 			type: "",
	// 			label: location.pathname,
	// 		},
	// 	})
	// })

	return (
		<div className="flex flex-grow h-full" ref={middleware}>
			<Outlet />
			<Thinking />
		</div>
	)
}
