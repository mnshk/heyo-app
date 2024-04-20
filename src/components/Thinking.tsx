import imageThinking from "@/assets/media/hmm-thinking.gif"
import Popup from "@/components/common/popup/Popup"
import getRandomInt from "@/utils/getRandomInt"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import RootContext from "../context/root"

export type delays = "short" | "medium" | "long"

const delays = {
	short: [1000, 2000],
	medium: [2000, 4000],
	long: [4000, 6000],
}

export default function Thinking() {
	const { loading, setLoading } = useContext(RootContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (loading.isLoading === true) {
			const delay = loading.delay ? delays[loading.delay] : delays["medium"]
			const time = getRandomInt(delay[0], delay[1])

			const timeout = setTimeout(() => {
				if (loading.callback) {
					loading.callback()
				}
				if (loading.navigateTo) {
					navigate(loading.navigateTo)
				}
				setLoading({ isLoading: false })
				// logService.send({
				// 	action: "Loading",
				// 	element: { type: time.toString(), label: loading.to },
				// })
			}, 500 ?? time)

			return () => {
				clearTimeout(timeout)
			}
		}
	})

	return (
		<Popup
			open={loading.isLoading}
			noBorder
			className="animate-thinking w-[275px]"
			controls={
				<div className="p-[25px] text-center flex-grow font-semibold">
					<div className="flex flex-col items-center gap-3 justify-center">
						{/* <div className="border-4 border-b-transparent border-gray-500 w-[28px] h-[28px] animate-spin rounded-full"></div> */}
						{/* <div className="font-bold">Loading...</div> */}

						<div>Thinking...</div>
						<div className="flex bg-gray-200 w-[150px] h-[8px] rounded-lg overflow-hidden shadow-inner">
							<div className="w-[50%] h-full rounded-lg bg-green-500 animate-loading-slide"></div>
						</div>
					</div>
				</div>
			}
			// wrapperProps={{
			// 	className: "backdrop-blur-lg",
			// }}
		>
			<img src={imageThinking} />
		</Popup>
	)
}
