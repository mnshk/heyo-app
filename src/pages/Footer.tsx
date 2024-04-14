import { useNavigate } from "react-router-dom"
import { ButtonDenySecondary } from "../common/Buttons"

export default function Footer() {
	const navigate = useNavigate()

	return (
		<div className="pt-10">
			<ButtonDenySecondary onClick={() => navigate("/goodbye")}>
				I don't care. Get me out
			</ButtonDenySecondary>
		</div>
	)
}
