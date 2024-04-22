import View from "@/components/common/containers/View"
import Loading from "@/components/Loading"
import RootContext from "@/context/root"
import authService from "@/services/auth/authService"
import getNetworkAddress from "@/utils/getNetworkAddress"
import { useContext, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function Login() {
	const { auth, setAuth } = useContext(RootContext)
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	async function handleLogin(sessionToken: string) {
		let networkAddress = sessionStorage.getItem("networkAddress")
		if (networkAddress === null) {
			const result = await getNetworkAddress()
			if (result === undefined) {
				navigate("/error")
				return
			}
			networkAddress = result
		}
		const result = await authService.validate(sessionToken, networkAddress)

		if (result === undefined) {
			sessionStorage.clear()
			navigate("/unauthorized")
			return
		} else {
			sessionStorage.setItem("sessionToken", sessionToken)
			sessionStorage.setItem("subject", result.subject)
			sessionStorage.setItem("networkAddress", networkAddress)

			setTimeout(() => {
				setAuth({
					isAuthenticated: true,
					networkAddress,
					sessionToken,
					subject: result.subject,
				})
				navigate("/")
			}, 3000)
		}
	}

	useEffect(() => {
		const tokenFromSearch = searchParams.get("token")
		const tokenFromSession = sessionStorage.getItem("sessionToken")

		if (auth.isAuthenticated) navigate("/")
		else if (tokenFromSearch !== null) handleLogin(tokenFromSearch)
		else if (tokenFromSession !== null) handleLogin(tokenFromSession)
		else navigate("/unauthorized")
		// eslint-disable-next-line
	}, [])
	return (
		<>
			<View />
			<Loading loading message="Please wait, making sure you are the right person to see this..." />
		</>
	)
}
