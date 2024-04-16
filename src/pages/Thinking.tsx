import { useContext, useEffect } from "react"
import RootContext from "../context"
import thinkingImg from "../assets/media/hmm-thinking.gif"

export default function Thinking() {
	const { loading, setLoading } = useContext(RootContext)

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 2500)
		return () => {
			clearTimeout(timer)
		}
	})

	return loading ? (
		<div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-70">
			<div className="bg-white rounded-3xl shadow-lg font-bold flex flex-col items-center justify-center overflow-hidden animate-thinking">
				<img src={thinkingImg} className="h-[200px]" />
				<div className="flex gap-3 p-[20px]">
					<div>Thinking...</div>
				</div>
			</div>
		</div>
	) : null
}
