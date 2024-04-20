import { useState } from "react"
import { RouterProvider } from "react-router-dom"
import RootContext from "./RootContext"
import router from "./router"
import { LoadingProps } from "./types/Loading"

export default function App() {
	const [subject, setSubject] = useState("Subject")
	const [progress, setProgress] = useState(0)
	const [hideSensitiveContentWarning, setHideSensitiveContentWarning] = useState(false)
	const [loading, setLoading] = useState<LoadingProps>({ isLoading: false })

	return (
		<RootContext.Provider
			value={{
				subject,
				setSubject,
				loading,
				setLoading,
				progress,
				setProgress,
				hideSensitiveContentWarning,
				setHideSensitiveContentWarning,
			}}
		>
			<RouterProvider router={router} />
		</RootContext.Provider>
	)
}
