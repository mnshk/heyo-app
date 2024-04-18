import { useContext } from "react"
import RootContext from "../../context"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function ProtectedRoutes() {
	const { isAuthenticated } = useContext(RootContext)
	const location = useLocation()

	// return isAuthenticated ? <Outlet /> : <Navigate to={`/login${location.search}`} replace />
	return <Outlet />
}
