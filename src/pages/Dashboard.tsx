import { useEffect, useState } from "react"
import { deleteAllLogs, deleteOneLog, getLogs } from "../utils/getLogs"
import { SimpleButton } from "../common/Buttons"

export default function Dashboard() {
	const [logs, setLogs] = useState([])

	const [authenticated, setAuthenticated] = useState(false)

	async function fetchLogs() {
		const data = await getLogs()
		setLogs(data.data)
		console.log(data)
	}

	function handleDelete(id) {
		setLogs(logs.filter((log) => log._id !== id))
		deleteOneLog(id)
	}

	// alert(import.meta.env.VITE_DASHBOARD_KEY)

	useEffect(() => {
		fetchLogs()
	}, [])

	const [value, setValue] = useState("theman")

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
			<div className="flex flex-col text-[14px] p-5 gap-2 flex-grow">
				<div className="flex gap-1">
					<SimpleButton onClick={fetchLogs}>Refresh</SimpleButton>
					<SimpleButton
						onClick={() => {
							if (confirm("Are you sure")) {
								deleteAllLogs()
								fetchLogs()
							}
						}}
					>
						Delete All
					</SimpleButton>
				</div>
				<div className="flex flex-col gap-1 flex-grow">
					{logs.length < 1 ? (
						<div className="flex items-center justify-center flex-grow">No Logs</div>
					) : (
						logs.map((doc) => {
							const time = new Date(doc.payload.time)

							return (
								<div className="border p-5 flex flex-col gap-2">
									<div className="flex gap-2">
										<div className="">
											{time.getFullYear()}-{time.getMonth() + 1}-
											{time.getDate()}
										</div>
										<div>
											{time.getHours()}:{time.getMinutes()}
										</div>
										<SimpleButton onClick={() => handleDelete(doc._id)}>
											Delete
										</SimpleButton>
									</div>
									<pre className="text-[14px] font-RobotoMono p-5 bg-gray-800 text-white rounded-md">
										{JSON.stringify(doc.payload, null, 4)}
									</pre>
								</div>
							)
						})
					)}
				</div>
			</div>
		)
	}
}
