import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './screens/ErrorPage'
import Root from './screens/Root'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
