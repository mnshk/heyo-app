import { useContext } from "react"
import { ButtonDeny, ButtonNeutral } from "../common/ui/buttons/Buttons"
import View, { ViewAction, ViewHeading, ViewMain } from "../common/ui/containers/view/View"
import RootContext from "../context"
import { useNavigate } from "react-router-dom"
import Footer from "../common/Footer"

export default function Heyo() {
	const { subject, setLoading } = useContext(RootContext)
	const navigate = useNavigate()

	return (
		<View>
			<ViewMain>
				<ViewHeading>Heyo {subject}!</ViewHeading>
				<div>If you are here that means you know me! or I know you.</div>
				<div>Would you like to deep dive and explore the uncertainties? Things that are yet to be explored.</div>
				{/* <div className="font-semibold">Break the ice if there's a spark</div> */}
			</ViewMain>
			<ViewAction>
				<ButtonNeutral
					onClick={() =>
						setLoading({
							isLoading: true,
							to: "question/do-you-know-me",
						})
					}
				>
					Alright! let's start
				</ButtonNeutral>
				<ButtonDeny onClick={() => navigate("/goodbye")}>No! leave me alone</ButtonDeny>
			</ViewAction>
			<Footer />
		</View>
	)
}
