import { useState } from "react"
import RootContext from "../context"
import Heyo from "./Heyo"
import { createMemoryRouter, Outlet, RouterProvider } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import Name from "./Name"
import Goodbye from "./Goodbye"

const router = createMemoryRouter([
	{
		path: "/",
		element: <Outlet />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Heyo /> },
			{ path: "name", element: <Name /> },
			{ path: "goodbye", element: <Goodbye /> },
		],
	},
])

export default function App() {
	document.title = "Heyo"

	const [subject, setSubject] = useState("Shubhani")

	return (
		<RootContext.Provider
			value={{
				subject,
				setSubject,
			}}
		>
			<RouterProvider router={router} />
		</RootContext.Provider>
	)
}
