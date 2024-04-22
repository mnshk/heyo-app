import View from "@/components/common/containers/View"
import LoggerInput from "@/components/common/inputs/LoggerInput"
import Popup, { PopupButton } from "@/components/common/popup/Popup"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function HeDoes() {
	const [value, setValue] = useState("")
	const navigate = useNavigate()

	return (
		<>
			<View />
			<Popup
				open
				title="Thank You!"
				message="Thank You for making it till the end. You have to leave a response here to end this quest."
				controls={
					<PopupButton
						disabled={value === ""}
						onClick={() => {
							navigate("/goodbye")
						}}
					>
						Finish
					</PopupButton>
				}
			>
				<LoggerInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="Leave your message here..." />
			</Popup>
		</>
	)
}
