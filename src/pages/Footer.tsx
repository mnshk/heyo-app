import { useLocation, useNavigate } from "react-router-dom"
import { ButtonDenySecondary } from "../common/Buttons"
import logService from "../utils/logService"

export default function Footer() {
	const navigate = useNavigate()

	const location = useLocation()

	function handleClick() {
		logService.send({
			action: "User clicked a button",
			element: {
				type:"button",
				label:"I don't care. Get me out"
			},
			location
		})
		navigate("/goodbye")
	}

	return (
		<div className="pt-10">
			<ButtonDenySecondary onClick={handleClick}>
				I don't care. Get me out
			</ButtonDenySecondary>
		</div>
	)
}
