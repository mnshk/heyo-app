import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Goodbye from "./pages/Goodbye"
import ErrorPage from "./pages/helpers/ErrorPage"
import Login from "./pages/helpers/Login"
import ProtectedRoutes from "./pages/helpers/ProtectedRoutes"
import Unauthorized from "./pages/helpers/Unauthorized"
import Heyo from "./pages/Heyo"
import Question from "./pages/question/Question"
import Thinking from "./pages/helpers/Thinking"

export default function AppRouter() {
	return (
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
	)
}
