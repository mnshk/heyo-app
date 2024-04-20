import { useContext, useEffect } from "react"
import View, { ViewMain } from "../common/ui/containers/view/View"
import RootContext from "../RootContext"

export default function Goodbye() {
	const { setAuth } = useContext(RootContext)

	useEffect(() => {
		setAuth({
			isAuthenticated: false,
			sessionToken: null,
			networkAddress: null,
			subject: null,
		})
	}, [setAuth])

	return (
		<View>
			<ViewMain>
				<div className="text-[24px] font-bold mb-2">Thank You!</div>
				<div>I appreciate your time. You may close this window.</div>
			</ViewMain>
		</View>
	)
}
