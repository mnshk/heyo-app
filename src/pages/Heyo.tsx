import { useContext, useEffect } from "react"
import { ButtonDeny, ButtonNeutral } from "../common/Buttons"
import View, { ViewAction, ViewHeading, ViewMain } from "../common/View"
import RootContext from "../context"
import { useNavigate, useSearchParams } from "react-router-dom"
import sendLog from "../utils/sendLog"

export default function Heyo() {
	const { subject } = useContext(RootContext)

	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	sendLog({
		
	})
	
	// async function test() {
	// 	const res = await fetch("/.netlify/functions/log", {
	// 		method: "post",
	// 		body: JSON.stringify({
	// 			message: "Hello",
	// 		}),
	// 	})
	// 	// console.log(res)

	// 	const data = await res.json()
	// 	console.log(data)
	// }

	// useEffect(() => {
	// 	test()
	// }, [])

	return (
		<View>
			<ViewMain>
				<ViewHeading>Heyo {subject}!</ViewHeading>
				<div>
					Hope you find this well. If you are here that means you know me! or I know you.
				</div>
				<div>
					There are some uncertain questions out there, looking for answers and yet to be
					explored.
				</div>
			</ViewMain>
			<ViewAction>
				<ButtonNeutral onClick={() => navigate("/name")}>
					Alright! let's start
				</ButtonNeutral>
				<ButtonDeny onClick={() => navigate("/goodbye")}>No! leave me alone</ButtonDeny>
			</ViewAction>
			<div>{searchParams.get("key")}</div>
		</View>
	)
}
