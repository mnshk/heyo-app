import { useState } from "react"
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom"
import RouteMiddleware from "./common/RouterMiddleware"
import RootContext, { ILoading } from "./context"
import Dashboard from "./pages/Dashboard"
import Goodbye from "./pages/Goodbye"
import ErrorPage from "./pages/helpers/ErrorPage"
import Login from "./pages/helpers/Login"
import ProtectedRoutes from "./pages/helpers/ProtectedRoutes"
import Unauthorized from "./pages/helpers/Unauthorized"
import Heyo from "./pages/Heyo"
import Question from "./pages/question/Question"

const router = createBrowserRouter([
	{ path: "dashboard", element: <Dashboard /> },
	{
		path: "",
		element: <RouteMiddleware />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "",
				element: <ProtectedRoutes />,
				children: [
					{ path: "", element: <Heyo /> },
					{
						path: "question",
						children: [
							{ path: "", element: <Link to="/" children="Home" /> },
							{ path: "what-would-you-like-to-be-called", element: <div>Name</div> },
							{ path: ":questionIdentifier", element: <Question /> },
						],
					},
					{ path: "goodbye", element: <Goodbye /> },
				],
			},
			{ path: "login", element: <Login /> },
			{ path: "error", element: <ErrorPage /> },
			{ path: "unauthorized", element: <Unauthorized /> },
		],
	},
])

export default function App() {
	document.title = "Heyo"

	const [subject, setSubject] = useState("Subject")
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [preferredName, setPreferredName] = useState("")
	const [progress, setProgress] = useState(0)
	const [hideSensitiveContentWarning, setHideSensitiveContentWarning] = useState(false)
	const [loading, setLoading] = useState<ILoading>({
		isLoading: false,
		to: "",
		delay: "medium",
	})

	return (
		<RootContext.Provider
			value={{
				subject,
				setSubject,
				isAuthenticated,
				setIsAuthenticated,
				preferredName,
				setPreferredName,
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
