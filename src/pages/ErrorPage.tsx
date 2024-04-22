import View, { ViewHeading, ViewMain } from "@/components/common/containers/View"
import { Link, useSearchParams } from "react-router-dom"

export default function ErrorPage() {
	const [searchParams] = useSearchParams()
	const errorMessage = searchParams.get("errorMessage") ?? "Something Went Wrong"
	const errorCode = searchParams.get("errorCode") ?? "NO_ERROR_CODE"
	const errorDescription =
		searchParams.get("errorDescription") ?? "An unexpected error has ocurred. Click the button below to restart the application."

	return (
		<View>
			<ViewMain>
				<ViewHeading>{errorMessage}</ViewHeading>
				<div>{errorDescription}</div>
				<div className="text-[12px] text-gray-500">Error Code: {errorCode}</div>
				<Link to="/">Restart</Link>
			</ViewMain>
		</View>
	)
}
