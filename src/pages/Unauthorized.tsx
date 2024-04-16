import View, { ViewHeading, ViewMain } from "../common/View"

export default function Unauthorized() {
	return (
		<View>
			<ViewMain>
				<ViewHeading>It's not for your eyes</ViewHeading>
				<div className="">How did you get here? You are not supposed to see this page.</div>
				<div className="text-[12px] text-gray-500">Error Code: Token Expired</div>
				<a href="/?token=kaka123">Token</a>
			</ViewMain>
		</View>
	)
}
