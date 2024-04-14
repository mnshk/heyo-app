import { useState } from "react"
import RootContext from "../context"
import Heyo from "./Heyo"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import Name from "./Name"
import Goodbye from "./Goodbye"
import ProtectedRoutes from "./ProtectedRoutes"
import Login from "./Login"
import Dashboard from "./Dashboard"

const router = createBrowserRouter([
	{
		path: "/",
		element: <ProtectedRoutes />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Heyo /> },
			{ path: "name", element: <Name /> },
			{ path: "goodbye", element: <Goodbye /> },
		],
	},
	{ path: "/login", element: <Login /> },
	{ path: "/error", element: <ErrorPage /> },
	{ path: "/dashboard", element: <Dashboard /> },
])

export default function App() {
	document.title = "Heyo"

	const [subject, setSubject] = useState("Subject")
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [preferredName, setPreferredName] = useState("")

	return (
		<RootContext.Provider
			value={{
				subject,
				setSubject,
				isAuthenticated,
				setIsAuthenticated,
				preferredName,
				setPreferredName,
			}}
		>
			<RouterProvider router={router} />
		</RootContext.Provider>
	)
}
