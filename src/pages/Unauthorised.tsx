import { useNavigate } from "react-router-dom"
import { ButtonNeutral } from "../common/Buttons"
import View, { ViewAction, ViewHeading, ViewMain } from "../common/View"

export default function Unauthorised() {
	const navigate = useNavigate()

	return (
		<View>
			<ViewMain>
				<ViewHeading>It's not for your eyes</ViewHeading>
				<div className="">How did you get here? You are not supposed to see this page.</div>
				<a href="?token=kaka123">Token</a>
			</ViewMain>
			<ViewAction>
				<ButtonNeutral onClick={() => navigate(-1)}>Close</ButtonNeutral>
			</ViewAction>
		</View>
	)
}
