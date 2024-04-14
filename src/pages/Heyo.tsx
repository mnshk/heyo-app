import { useContext } from "react"
import { ButtonDeny, ButtonNeutral } from "../common/Buttons"
import View, { ViewAction, ViewHeading, ViewMain } from "../common/View"
import RootContext from "../context"
import { useNavigate } from "react-router-dom"

export default function Heyo() {
	const { subject } = useContext(RootContext)

	const navigate = useNavigate()

	return (
		<View>
			<ViewMain>
				<ViewHeading>Heyo Miss {subject}!</ViewHeading>
				<div>
					Hope you find this well. If you are here that means you know me! or I know you.
				</div>
				<div>
					There are some uncertian questions out there, looking for answers and yet to be
					explored.
				</div>
			</ViewMain>
			<ViewAction>
				<ButtonNeutral onClick={() => navigate("/name")}>
					Alright! let's start
				</ButtonNeutral>
				<ButtonDeny onClick={() => navigate("/goodbye")}>No! leave me alone</ButtonDeny>
			</ViewAction>
		</View>
	)
}
