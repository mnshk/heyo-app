import { useNavigate } from "react-router-dom"
import { ButtonNeutral } from "../common/Buttons"
import View, { ViewAction, ViewMain } from "../common/View"
import { useContext, useEffect } from "react"
import RootContext from "../context"

export default function Goodbye() {
	const navigate = useNavigate()
	const { setIsAuthenticated } = useContext(RootContext)

	useEffect(() => {
		setIsAuthenticated(false)
	}, [])

	return (
		<View>
			{/* <div className="flex w-full">
				<button onClick={() => navigate(-1)}>Back</button>
			</div> */}
			<ViewMain>
				<div className="text-[24px] font-bold mb-2">Thank You!</div>
				<div>I appreciate your time. You may close this window.</div>
			</ViewMain>
			<ViewAction>
				{/* <ButtonNeutral
					onClick={() => {
						window.close()
						// history.back()
					}}
				>
					Done!
				</ButtonNeutral> */}
			</ViewAction>
		</View>
	)
}
