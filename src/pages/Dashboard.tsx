import { PropsWithChildren, useEffect, useState } from "react"
import { SimpleButton } from "../common/ui/buttons/Buttons"
import logService from "../utils/logService"
import { ILog } from "../types/log"

export default function Dashboard() {
	const [logs, setLogs] = useState<ILog[]>([])

	const [authenticated, setAuthenticated] = useState(false)

	async function fetchLogs() {
		if (document.visibilityState === "hidden") return

		setLoading(true)
		const data = await logService.get()
		setLoading(false)
		if (data.error.hasError) {
			alert("Error")
			return
		}
		setLogs(data.payload as ILog[])
	}

	function handleDelete(id: string) {
		setLogs(logs.filter((log) => log._id !== id))
		logService.delete(id)
	}

	useEffect(() => {
		fetchLogs()
		setAuthenticated(true)

		addEventListener("visibilitychange", fetchLogs)
		return () => {
			removeEventListener("visibilitychange", fetchLogs)
		}
	}, [])

	const [value, setValue] = useState("theman")

	const [loading, setLoading] = useState(false)

	let last = ""

	if (!authenticated) {
		return (
			<div className="flex flex-col flex-grow p-10 gap-2 justify-center items-center">
				<div className="border border-gray-300 w-[300px] flex">
					<input
						className="p-[1px] px-[6px] outline-none text-[14px] flex-grow"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Type here"
						type="password"
					/>
					<SimpleButton
						onClick={() => {
							if (value === import.meta.env.VITE_DASHBOARD_KEY) {
								setAuthenticated(true)
							}
							setValue("")
						}}
					>
						Next
					</SimpleButton>
				</div>
			</div>
		)
	} else {
		return (
			<div className="flex flex-col text-[14px] py-5 gap-2 flex-grow h-0">
				<div className="flex gap-1 px-5 items-center">
					<SimpleButton onClick={fetchLogs}>Refresh</SimpleButton>
					<SimpleButton
						onClick={() => {
							if (confirm("Are you sure")) {
								logService.deleteAll()
								fetchLogs()
							}
						}}
					>
						Delete All
					</SimpleButton>
					<div className="flex-grow"></div>
					<div>{loading ? "Loading..." : null}</div>
				</div>
				<div className="flex flex-col gap-1 flex-grow overflow-y-scroll bg-gray-100 p-[5px]">
					{logs.length < 1 ? (
						<div className="flex items-center justify-center flex-grow">No Logs</div>
					) : (
						logs.map((log) => {
							if (log.ip === undefined || log.meta?.userAgent === undefined) {
								return null
							}

							let separator = null

							const current = `${log.ip} - ${log.meta?.userAgent.split("(")[1].split(")")[0]}`
							if (current !== last) {
								separator = <Separator>{current}</Separator>
							}
							last = current

							const time = new Date(log.time!)

							if (log.action === "Rendering") {
								return (
									<>
										{separator}
										<Separator>{log.element.label}</Separator>
									</>
								)
							}

							return (
								<>
									{separator}
									{/* <CollapseBox
										hidden={
											<pre className="text-[14px] font-RobotoMono p-2 bg-gray-800 text-white w-full overflow-auto">
												{JSON.stringify(log, null, 4)}
											</pre>
										}
									> */}
									<div className="border p-2 flex flex-col bg-white">
										<div className="flex gap-4 items-center">
											<div className="flex-grow flex items-center gap-1">
												<span className="">{log.action}</span>
												<span className="bg-orange-100 px-1">{log.element.label}</span>
												<span className="">{log.element.type}</span>
											</div>
											<div className="text-gray-500 flex gap-1 text-[12px]">
												<div>
													{time.getHours() < 10 ? 0 : null}
													{time.getHours()}:{time.getMinutes() < 10 ? 0 : null}
													{time.getMinutes()}
												</div>
												{/* <div>
												{time.getFullYear()}-{time.getMonth() + 1}-{time.getDate()}
											</div> */}
											</div>
											<button
												className="bg-gray-200 w-[20px] h-[20px] flex items-center justify-center"
												onClick={() => handleDelete(log._id!)}
											>
												&times;
											</button>
										</div>
									</div>
									{/* </CollapseBox> */}
								</>
							)
						})
					)}
				</div>
			</div>
		)
	}
}

// function CollapseBox(props: PropsWithChildren & { hidden: ReactNode }) {
// 	const [open, setOpen] = useState(false)
// 	return (
// 		<div className="flex flex-col cursor-pointer" onClick={() => setOpen(!open)}>
// 			{props.children}
// 			{open ? <div className="flex flex-grow">{props.hidden}</div> : null}
// 		</div>
// 	)
// }

export function Separator(props: PropsWithChildren) {
	return <div className="p-2 text-gray-500 text-[10px] text-center">{props.children}</div>
}
