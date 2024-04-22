import logService from "@/services/log/logService"
import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { clickLogger, visibilityLogger } from "../../utils/loggers"

export default function LoggerMiddleware() {
	const location = useLocation()

	useEffect(() => {
		addEventListener("click", clickLogger)
		addEventListener("visibilitychange", visibilityLogger)

		return () => {
			removeEventListener("click", clickLogger)
			removeEventListener("visibilitychange", visibilityLogger)
		}
	}, [])

	useEffect(() => {
		logService.create({
			name: "navigated",
			target: {
				label: location.pathname + location.search,
				type: "",
			},
		})
	}, [location])

	return <Outlet />
}
