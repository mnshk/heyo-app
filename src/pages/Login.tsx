import { useContext } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import RootContext from "../context"
import Unauthorised from "./Unauthorised"

export default function Login() {
	const { setIsAuthenticated } = useContext(RootContext)
	const [searchParams] = useSearchParams()
	const token = searchParams.get("token")

	const access_token = import.meta.env.VITE_ACCESS_TOKEN

	console.log(access_token)

	if (token === null || token !== access_token) {
		return <Unauthorised />
	} else {
		setIsAuthenticated(true)
		return <Navigate to="/" replace />
	}
}
