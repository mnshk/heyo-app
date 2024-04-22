import RootContext from "@/context/root"
import { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function ProtectedRoutes() {
	const { auth } = useContext(RootContext)
	const location = useLocation()

	return auth.isAuthenticated ? <Outlet /> : <Navigate to={"/login" + location.search} />
}
