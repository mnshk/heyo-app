import { useEffect, useState } from "react"
import RootContext from "../context"
import Heyo from "./Heyo"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import Name from "./Name"
import Goodbye from "./Goodbye"
import ProtectedRoutes from "./ProtectedRoutes"
import Login from "./Login"
import Dashboard from "./Dashboard"
import Unauthorized from "./Unauthorized"
import RouteMiddleware from "../common/RouterMiddleware"
import fetchIP from "../utils/fetchIP"
import Thinking from "./Thinking"

const router = createBrowserRouter([
	{ path: "dashboard", element: <Dashboard /> },
	{
		path: "/",
		element: <RouteMiddleware />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "",
				element: <ProtectedRoutes />,
				children: [
					{ path: "", element: <Heyo /> },
					{ path: "name", element: <Name /> },
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
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchIP()
	}, [])

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
			}}
		>
			<RouterProvider router={router} />
			<Thinking />
		</RootContext.Provider>
	)
}
