import { useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoggerMiddleware from "./components/middlewares/LoggerMiddleware"
import ProtectedRoutes from "./components/middlewares/ProtectedRoutes"
import Thinking from "./components/Thinking"
import RootContext from "./context/root"
import { ISettings } from "./context/root/types"
import { IAuth } from "./context/root/types/"
import Dashboard from "./pages/Dashboard"
import ErrorPage from "./pages/ErrorPage"
import Goodbye from "./pages/Goodbye"
import Heyo from "./pages/Heyo"
import Login from "./pages/Login"
import Question from "./pages/Question"
import Unauthorized from "./pages/Unauthorized"
import { ILoading } from "./types/Loading"

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
			<BrowserRouter basename="/do-i-know-you">
				<Routes>
					<Route path="/" element={<LoggerMiddleware />}>
						<Route path="/" element={<ProtectedRoutes />}>
							<Route index element={<Heyo />} />
							<Route path="/question/:questionIdentifier" element={<Question />} />
							<Route path="/question/goodbye" element={<Navigate to="/goodbye" />} />
						</Route>
						<Route path="/goodbye" element={<Goodbye />} />
						<Route path="/login" element={<Login />} />
						<Route path="/error" element={<ErrorPage />} />
						<Route path="/unauthorized" element={<Unauthorized />} />
						<Route path="/*" element={<div>404 Page not found</div>} />
					</Route>
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
				<Thinking />
			</BrowserRouter>
		</RootContext.Provider>
	)
}
