import { useNavigate } from "react-router-dom"
import { ButtonDenySecondary } from "../common/Buttons"
import sendLog from "../utils/sendLog"

export default function Footer() {
	const navigate = useNavigate()

	function handleClick() {
		sendLog({
			action: "button_click",
			message: "clicked: I don't care. Get me out",
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
