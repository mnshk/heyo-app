import getNetworkAddress from "@/utils/getNetworkAddress"
import { useContext, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import RootContext from "../../RootContext"

export default function Login() {
	const { setAuth } = useContext(RootContext)
	const [searchParams] = useSearchParams()
	const token = searchParams.get("token")
	const navigate = useNavigate()

	async function handleLogin() {
		const networkAddress = await getNetworkAddress()
		const res = {
			isValid: true,
			subject: "Shubhani",
		}
		if (networkAddress && res.isValid) {
			setAuth((prev) => ({
				...prev,
				isAuthenticated: true,
				sessionToken: token,
				subject: "Shubhani",
			}))
			navigate("/")
		} else {
			navigate("/error")
		}
	}

	useEffect(() => {
		if (token !== null && token === "kaka123") {
			handleLogin()
		} else {
			navigate("/unauthorized")
		}
	}, [])

	return null
}