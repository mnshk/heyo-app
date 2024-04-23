import { useContext } from "react"
import { ButtonDeny, ButtonNeutral } from "../components/common/buttons/Buttons"
import View, { ViewAction, ViewHeading, ViewMain } from "../components/common/containers/View"
import RootContext from "../context/root"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Popup, { PopupButton } from "@/components/common/popup/Popup"

export default function Heyo() {
	const { auth, setLoading } = useContext(RootContext)
	const navigate = useNavigate()
	const lastQuestion = sessionStorage.getItem("lastQuestion")
	return (
		<>
			<View>
				<ViewMain>
					<ViewHeading>Heyo {auth.subject}!</ViewHeading>
					{/* <div>Technically it's a survey. But I'd call it a quest.</div> */}
					<div>Would you like to deep dive to answer some of these questions?</div>
					{/* <div>Some of the cliff-hangers are looking for answers.</div> */}
				</ViewMain>
				<ViewAction>
					<ButtonNeutral
						onClick={() =>
							setLoading({
								isLoading: true,
								navigateTo: "question/usual-mood",
							})
						}
					>
						Alright! let's start
					</ButtonNeutral>
					<ButtonDeny onClick={() => navigate("/goodbye")}>No! leave me alone</ButtonDeny>
				</ViewAction>
				<Footer />
			</View>
			<Popup
				open={lastQuestion !== null}
				title="Continue where you left off?"
				message="Would you like to continue from your last question?"
				controls={
					<>
						<PopupButton
							onClick={() => {
								sessionStorage.removeItem("lastQuestion")
								navigate("/goodbye")
							}}
						>
							No exit
						</PopupButton>
						<PopupButton
							onClick={() =>
								setLoading({
									isLoading: true,
									navigateTo: "question/" + lastQuestion,
								})
							}
						>
							Continue
						</PopupButton>
					</>
				}
			></Popup>
		</>
	)
}
