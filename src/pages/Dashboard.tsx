import { PropsWithChildren, useEffect, useState } from "react"
import { SimpleButton } from "../components/common/buttons/Buttons"
import logService from "../services/log/logService"
import { ILog } from "../types/Log"

export default function Dashboard() {
	const [logs, setLogs] = useState<ILog[]>([])

	const [authenticated, setAuthenticated] = useState(false)

	async function fetchLogs() {
		if (document.visibilityState === "hidden") return
		setLoading(true)
		const data = await logService.get()
		setLoading(false)
		if (!data) {
			console.log("Error", data)
			return
		}
		setLogs(data as ILog[])
	}

	function handleDelete(id: string | undefined) {
		setLogs(logs.filter((log) => log._id !== id))
		logService.delete("_id", id!)
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

	// let last = ""

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
						onClick={async () => {
							if (confirm("Are you sure")) {
								await logService.delete("", "*")
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
							if (log.action.name === "focus" || log.action.name === "navigated") {
								return (
									<div className="text-[11px] flex text-center p-2">
										<div className="flex-grow">
											{log.action.name} {log.action.target.label}
										</div>
										<div>
											<button onClick={() => handleDelete(log._id)}>Delete</button>
										</div>
									</div>
								)
							}

							return (
								<div className="flex bg-white items-center border p-2">
									<div className="flex-grow">
										{log.subject} {log.action.name} {log.action.target.label} {log.action.target.type}
									</div>
									<div className="flex gap-2 px-2">
										{log.action.target.value !== undefined
											? log.action.target.value.map((value) => <div className="bg-yellow-100 px-[2px]">{value}</div>)
											: null}
									</div>
									<div className="flex shrink-0 items-center">
										<SimpleButton onClick={() => handleDelete(log._id)}>Delete</SimpleButton>
									</div>
								</div>
							)

							// let separator = null

							// const current = `${log.networkAddress} - ${log.device.split("(")[1].split(")")[0]}`
							// if (current !== last) {
							// 	separator = <Separator>{current}</Separator>
							// }
							// last = current

							// const time = new Date(log.createdAt)

							// if (log.action.name === "navigated") {
							// 	return (
							// 		<>
							// 			{separator}
							// 			<Separator>{log.action.target.label}</Separator>
							// 		</>
							// 	)
							// }

							// return (
							// 	<>
							// 		{separator}
							// 		{/* <CollapseBox
							// 			hidden={
							// 				<pre className="text-[14px] font-RobotoMono p-2 bg-gray-800 text-white w-full overflow-auto">
							// 					{JSON.stringify(log, null, 4)}
							// 				</pre>
							// 			}
							// 		> */}
							// 		<div className="border p-2 flex flex-col bg-white">
							// 			<div className="flex gap-4 items-center">
							// 				<div className="flex-grow flex items-center gap-1">
							// 					<span className="">{log.action.name}</span>
							// 					<span className="bg-orange-100 px-1">{log.action.target.label}</span>
							// 					<span className="">{log.action.target.type}</span>
							// 				</div>
							// 				<div className="text-gray-500 flex gap-1 text-[12px]">
							// 					<div>
							// 						{time.getHours() < 10 ? 0 : null}
							// 						{time.getHours()}:{time.getMinutes() < 10 ? 0 : null}
							// 						{time.getMinutes()}
							// 					</div>
							// 					{/* <div>
							// 					{time.getFullYear()}-{time.getMonth() + 1}-{time.getDate()}
							// 				</div> */}
							// 				</div>
							// 				<button
							// 					className="bg-gray-200 w-[20px] h-[20px] flex items-center justify-center"
							// 					onClick={() => handleDelete(log._id!)}
							// 				>
							// 					&times;
							// 				</button>
							// 			</div>
							// 		</div>
							// 		{/* </CollapseBox> */}
							// 	</>
							// )
						})
					)}
				</div>
				{/* <Popup
					open
					title="Create Token"
					controls={
						<>
							<PopupButton>Cancel</PopupButton>
							<PopupButton>Create</PopupButton>
						</>
					}
				>
					<Input placeholder="Session Token" />
					<Input placeholder="Subject" />
					<div className="flex items-center px-2 gap-2">
						<input type="checkbox" className="scale-125" id="input-dashboard-auto-expire" />
						<label htmlFor="input-dashboard-auto-expire">Auto expire on use</label>
					</div>
				</Popup> */}
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
