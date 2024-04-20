import { useContext } from "react"
import { ButtonDeny, ButtonNeutral } from "../components/common/buttons/Buttons"
import View, { ViewAction, ViewHeading, ViewMain } from "../components/common/containers/View"
import RootContext from "../context/root"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"

export default function Heyo() {
	const { auth, setLoading } = useContext(RootContext)
	const navigate = useNavigate()

	return (
		<View>
			<ViewMain>
				<ViewHeading>Heyo {auth.subject}!</ViewHeading>
				<div>If you are here that means you know me! or I know you.</div>
				<div>Would you like to deep dive and explore the uncertainties? Things that are yet to be explored.</div>
				{/* <div className="font-semibold">Break the ice if there's a spark</div> */}
			</ViewMain>
			<ViewAction>
				<ButtonNeutral
					onClick={() =>
						setLoading({
							isLoading: true,
							navigateTo: "question/do-you-know-me",
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
