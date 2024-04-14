import { useContext } from "react"
import { ButtonNeutral } from "../common/Buttons"
import View, { ViewAction, ViewHeading, ViewMain } from "../common/View"
import Footer from "./Footer"
import { useNavigate } from "react-router-dom"
import RootContext from "../context"

export default function Name() {
	const navigate = useNavigate()

	const { setPreferredName } = useContext(RootContext)

	function handleSetPreferredName(name: string) {
		setPreferredName(name)
	}

	return (
		<View>
			<div className="flex w-full">
				<button onClick={() => navigate(-1)}>Back</button>
			</div>
			<ViewMain>
				<ViewHeading>What would you like to be called here?</ViewHeading>
			</ViewMain>
			<ViewAction>
				<ButtonNeutral onClick={()=>handleSetPreferredName('S')}>S</ButtonNeutral>
				<ButtonNeutral onClick={()=>handleSetPreferredName('Shu')}>Shu</ButtonNeutral>
				<ButtonNeutral onClick={()=>handleSetPreferredName('Shubhani')}>Shubhani</ButtonNeutral>
			</ViewAction>
			<Footer />
		</View>
	)
}
