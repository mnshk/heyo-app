import View, { ViewHeading, ViewMain } from "../common/View"
import Footer from "./Footer"
import { useNavigate } from "react-router-dom"

export default function Name() {
	const navigate = useNavigate()

	return (
		<View>
			<div className="flex w-full">
				<button onClick={() => navigate(-1)}>Back</button>
			</div>
			<ViewMain>
				<ViewHeading>What would you like to be called here?</ViewHeading>
			</ViewMain>
			<Footer />
		</View>
	)
}
