import { useNavigate, useRouteError } from 'react-router-dom'
import Screen from '../components/Screen'

export default function ErrorPage() {
	const error: any = useRouteError()
	document.title = error.statusText
	const navigate = useNavigate()

	return (
		<Screen>
			<div className='flex gap-2'>
				<div>
					{error.status} {error.statusText}
				</div>
				<div>|</div>
				<button
					onClick={() => navigate(-1)}
					className='link'
					title='Back'
				>
					Back
				</button>
			</div>
		</Screen>
	)
}
