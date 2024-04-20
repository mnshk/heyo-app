import { useState } from "react"
import AppRouter from "./AppRouter"
import RootContext from "./RootContext"
import { ILoading } from "./types/Loading"
import { IAuth, ISettings } from "./types/RootContext"

export default function App() {
	const [auth, setAuth] = useState<IAuth>({
		isAuthenticated: false,
		sessionToken: null,
		subject: null,
		networkAddress: null,
	})
	const [settings, setSettings] = useState<ISettings>({
		hideSensitiveContentWarning: false,
	})
	const [loading, setLoading] = useState<ILoading>({
		isLoading: false,
	})
	const [progress, setProgress] = useState<number>(0)

	return (
		<RootContext.Provider
			value={{
				auth,
				setAuth,
				settings,
				setSettings,
				loading,
				setLoading,
				progress,
				setProgress,
			}}
		>
			<AppRouter />
		</RootContext.Provider>
	)
}
