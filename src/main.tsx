import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import Root from './pages/Root'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Outlet />,
		errorElement: <ErrorPage />,
		children: [{ index: true, element: <Root /> }],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
