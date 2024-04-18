import { isRouteErrorResponse, useNavigate, useRouteError, useSearchParams } from "react-router-dom"
import Container from "../../common/ui/containers/Container"

export default function ErrorPage() {
	const error = useRouteError()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	let errorMessage = searchParams.get("errorMessage") ?? "Something went wrong"
	let errorCode = searchParams.get("errorCode")

	if (isRouteErrorResponse(error)) {
		errorMessage = error.statusText
		errorCode = error.status.toString()
	}

	document.title = errorMessage

	return (
		<Container>
			<div className="flex gap-2">
				<div>
					{errorCode} {errorMessage}
				</div>
				<div>|</div>
				<button onClick={() => navigate(-1)} className="link" title="Back">
					Back
				</button>
			</div>
		</Container>
	)
}
