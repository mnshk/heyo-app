import { useContext, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import RootContext from "../../context"

export default function Login() {
	const { setIsAuthenticated } = useContext(RootContext)
	const [searchParams] = useSearchParams()
	const access_token = import.meta.env.VITE_ACCESS_TOKEN
	const token = searchParams.get("token")
	const navigate = useNavigate()

	useEffect(() => {
		if (token !== null && token === access_token) {
			setIsAuthenticated(true)
			navigate("/")
		} else {
			navigate("/unauthorized")
		}
	})
	return null
}
