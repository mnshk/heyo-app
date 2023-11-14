import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import Container from '../common/Container'

export default function ErrorPage() {
	const error = useRouteError()
	const navigate = useNavigate()

	let statusText = 'Something went wrong'
	let statusCode

	if (isRouteErrorResponse(error)) {
		statusText = error.statusText
		statusCode = error.status
	}

	document.title = statusText

	return (
			<Container>
				<div className='flex gap-2'>
					<div>
						{statusCode} {statusText}
					</div>
					<div>|</div>
					<button onClick={() => navigate(-1)} className='link' title='Back'>
						Back
					</button>
				</div>
			</Container>
	)
}
