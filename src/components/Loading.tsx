import Popup from "@/components/common/popup/Popup"

export default function Loading({ loading, message }: { loading: boolean; message?: string }) {
	return (
		<Popup
			open={loading}
			noBorder
			controls={
				<div className="p-[25px] text-center flex-grow font-semibold">
					<div className="flex flex-col items-center gap-3 justify-center">
						<div>{message ?? "Loading..."}</div>
						<div className="flex bg-gray-200 w-[150px] h-[8px] rounded-lg overflow-hidden shadow-inner">
							<div className="w-[50%] h-full rounded-lg bg-green-500 animate-loading-slide"></div>
						</div>
					</div>
				</div>
			}
		/>
	)
}
