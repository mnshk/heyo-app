import { useContext } from "react"
import { ButtonDeny, ButtonNeutral } from "../common/Buttons"
import View, { ViewAction, ViewHeading, ViewMain } from "../common/View"
import RootContext from "../context"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function Heyo() {
	const { subject, setLoading } = useContext(RootContext)
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	return (
		<View>
			<ViewMain>
				<ViewHeading>Heyo {subject}!</ViewHeading>
				<div className="font-semibold">Break the ice if there's a spark</div>
				<div>Well, if you are here that means you know me! or I know you.</div>
				<div>There are some uncertainties yet to be explored.</div>
			</ViewMain>
			<ViewAction>
				<ButtonNeutral
					onClick={() =>
						setLoading({
							isLoading: true,
							to: "/name",
						})
					}
				>
					Alright! let's start
				</ButtonNeutral>
				<ButtonDeny onClick={() => navigate("/goodbye")}>No! leave me alone</ButtonDeny>
			</ViewAction>
			<div>{searchParams.get("key")}</div>
		</View>
	)
}
