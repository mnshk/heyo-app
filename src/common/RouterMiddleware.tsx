import { Outlet, useLocation } from "react-router-dom"
import logService from "../utils/logService"

export default function RouteMiddleware() {
	const location = useLocation()
	logService.send({
		action: `Rendering ${location.pathname + location.search + location.hash}`,
		element: {
			type: "Component",
			label: "RouteMiddleware",
		},
		location,
	})

	return <Outlet />
}
