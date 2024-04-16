import { useContext, useEffect } from "react"
import RootContext from "../context"
import thinkingImg from "../assets/media/hmm-thinking.gif"
import { useNavigate } from "react-router-dom"

const delays = {
	short: 2000,
	medium: 4000,
	long: 6000,
}

function getRandom(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min
}

export default function Thinking() {
	const { loading, setLoading } = useContext(RootContext)

	const navigate = useNavigate()

	useEffect(() => {
		if (loading.isLoading === true) {
			const time = loading.delay ? delays[loading.delay] : getRandom(1000, 10000)

			console.log(time)

			const timeout = setTimeout(() => {
				navigate(loading.to!)
				setLoading({ isLoading: false })
			}, time)

			return () => {
				clearTimeout(timeout)
			}
		}
	})

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setLoading(false)
	// 	}, 2500)
	// 	return () => {
	// 		clearTimeout(timer)
	// 	}
	// })

	return loading.isLoading ? (
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
