import { useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Goodbye from "./pages/Goodbye"
import ErrorPage from "./pages/ErrorPage"
import Login from "./pages/Login"
import ProtectedRoutes from "./components/middlewares/ProtectedRoutes"
import Thinking from "./components/Thinking"
import Unauthorized from "./pages/Unauthorized"
import Heyo from "./pages/Heyo"
import Question from "./pages/Question"
import RootContext from "./context/root"
import { ILoading } from "./types/Loading"
import { IAuth } from "./context/root/types/IAuth"
import { ISettings } from "./context/root/types"

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
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<ProtectedRoutes />
								<Thinking />
							</>
						}
					>
						<Route path="/question/:questionIdentifier" element={<Question />} />
						<Route index element={<Heyo />} />
					</Route>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/unauthorized" element={<Unauthorized />} />
					<Route path="/login" element={<Login />} />
					<Route path="/goodbye" element={<Goodbye />} />
					<Route path="/error" element={<ErrorPage />} />
					<Route path="/*" element={<Navigate to="/error?errorMessage=404&errorCode=404&errorDescription=Page not found" />} />
				</Routes>
			</BrowserRouter>
		</RootContext.Provider>
	)
}
