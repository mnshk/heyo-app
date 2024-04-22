import { ILog } from "@/types/ILog"
import { ButtonHTMLAttributes, InputHTMLAttributes, PropsWithChildren, ReactNode, useEffect, useState } from "react"
import logService from "../services/log/logService"
import { MdDeleteOutline } from "react-icons/md"

export default function Dashboard() {
	const [logs, setLogs] = useState<ILog[]>([])
	const [loading, setLoading] = useState(false)
	const [authenticated, setAuthenticated] = useState(false)
	const [inputUsername, setInputUsername] = useState("")
	const [inputPassword, setInputPassword] = useState("")
	const [error, setError] = useState("")
	let lastNetworkAddress = ""
	let lastDevice = ""
	let lastSessionToken = ""
	let isHidden = false
	let lastHiddenOn = -1
	let lastDate = ""

	async function fetchLogs() {
		if (document.visibilityState === "hidden") return
		setLoading(true)
		const data = await logService.get()
		setLoading(false)
		if (data === undefined) setError("Unable to fetch logs.")
		else setLogs(data as ILog[])
	}

	function handleDelete(id: string | undefined) {
		setLogs(logs.filter((log) => log._id !== id))
		logService.delete("_id", id!)
	}

	const tokenFromLocalStorage = localStorage.getItem("dashboardToken")
	const tokenFromEnv = import.meta.env.VITE_DASHBOARD_KEY

	useEffect(() => {
		fetchLogs()

		if (tokenFromLocalStorage !== null && tokenFromEnv !== undefined && tokenFromEnv === tokenFromLocalStorage) {
			setAuthenticated(true)
		}

		addEventListener("visibilitychange", fetchLogs)
		return () => {
			removeEventListener("visibilitychange", fetchLogs)
		}
	}, [])

	if (tokenFromEnv === undefined) {
		return <div className="bg-gray-900 flex-grow flex items-center justify-center text-white">Internal Application Error</div>
	}

	if (!authenticated) {
		return (
			<div className="flex flex-col flex-grow p-10 gap-2 justify-center items-center bg-gray-900">
				<div className="p-10 bg-gray-800 border border-gray-700 rounded-md flex flex-col gap-2 shadow-xl w-full max-w-[350px]">
					<div className="text-white pb-5 text-center text-[20px]">Login</div>
					<Input value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} placeholder="Username" type="text" />
					<Input value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} placeholder="Password" type="password" />
					<Button
						onClick={() => {
							if (inputPassword === tokenFromEnv && inputUsername === "admin") {
								localStorage.setItem("dashboardToken", tokenFromEnv)
								setAuthenticated(true)
							}
							setInputPassword("")
							setInputUsername("")
						}}
					>
						Next
					</Button>
				</div>
			</div>
		)
	} else {
		return (
			<div className="flex flex-col text-[14px] text-white flex-grow h-0 bg-gray-800 px-1 py-5 gap-3">
				<div className="flex gap-2 py-5 items-center px-2">
					<div className="flex-grow text-[20px] font-bold">Dashboard</div>
					<Highlighted>{loading ? "Loading..." : null}</Highlighted>
					<Button onClick={fetchLogs}>Refresh</Button>
					<Button
						onClick={async () => {
							if (confirm("Are you sure")) {
								await logService.delete("", "*")
								fetchLogs()
							}
						}}
					>
						Delete All
					</Button>
					<Button
						onClick={() => {
							localStorage.clear()
							window.location.reload()
						}}
					>
						Logout
					</Button>
				</div>
				{error ? (
					<div className="text-red-300 p-2 flex">
						<Highlighted color="bg-red-400">Error: {error}</Highlighted>
					</div>
				) : null}

				<div className="flex flex-col gap-1 flex-grow overflow-y-auto border rounded-md border-gray-700 p-2">
					{logs.length < 1 ? (
						<div className="flex items-center justify-center flex-grow">No Logs</div>
					) : (
						logs.map(({ _id, subject, networkAddress, device, sessionToken, action, createdAt }) => {
							const out: ReactNode[] = []

							if (networkAddress !== null && networkAddress.trim() !== lastNetworkAddress) {
								lastNetworkAddress = networkAddress
								out.push(<MutedContainer color="bg-red-200 text-black">{networkAddress}</MutedContainer>)
							}
							if (device !== null && device.trim() !== lastDevice) {
								lastDevice = device
								out.push(<MutedContainer color="bg-red-200 text-black">{device.split("(")[1].split(")")[0]}</MutedContainer>)
							}
							if (sessionToken !== null && sessionToken.trim() !== lastSessionToken) {
								lastSessionToken = sessionToken
								out.push(
									<MutedContainer color="bg-red-200 text-black">
										{subject} ({sessionToken})
									</MutedContainer>
								)
							}

							if (["navigated", "dialog"].includes(action.name)) {
								out.push(
									<MutedContainer color="bg-gray-400 text-black">
										{action.name} {action.target.label}
									</MutedContainer>
								)
							}

							if (action.name === "focus") {
								if (action.target.label === "hidden") {
									isHidden = true
									lastHiddenOn = createdAt
								} else if (action.target.label === "visible") {
									isHidden = false
								}

								if (lastHiddenOn !== -1 && isHidden === false) {
									const temp = lastHiddenOn
									lastHiddenOn = -1
									out.push(
										<MutedContainer color="text-black bg-gray-400">
											Paused for {((createdAt - temp) / 1000).toFixed()}s
										</MutedContainer>
									)
								}
							}

							if (
								!["navigated", "focus", "dialog"].includes(action.name) &&
								action.target.type !== undefined &&
								action.target.type !== "DIV"
							)
								out.push(
									<div className="flex bg-gray-800 border-gray-700 text-white border rounded-md p-2 w-full">
										<div className="flex items-center gap-2 flex-grow">
											{action.name}
											<Highlighted>{action.target.label}</Highlighted>
											{action.name === "input" && action.target.value !== undefined ? (
												<div className="flex flex-grow items-start flex-col bg-gray-700 p-2 rounded-md gap-2">
													{action.target.value.map((v) => (
														<Highlighted color="bg-gray-800 text-white">{v}</Highlighted>
													))}
												</div>
											) : null}
										</div>
									</div>
								)

							const _time = new Date(createdAt)
							const time = {
								day: pad(_time.getDate()),
								month: pad(_time.getMonth() + 1),
								year: _time.getFullYear(),
								hours: pad(_time.getHours()),
								minutes: pad(_time.getMinutes()),
								seconds: pad(_time.getSeconds()),
							}
							const datetime = {
								time: `${time.hours}:${time.minutes}`,
								timeWithSeconds: `${time.hours}:${time.minutes}:${time.seconds}`,
								date: `${time.year}-${time.month}-${time.day}`,
							}

							if (datetime.date !== lastDate) {
								lastDate = datetime.date
								out.push(<MutedContainer color="bg-gray-700">{datetime.date}</MutedContainer>)
							}

							return out.length > 0 ? (
								<div className="border bg-gray-900 border-gray-700 rounded-md p-2 flex justify-center items-center gap-2 hover:border-orange-300">
									<div className="flex items-center gap-2">
										<Highlighted color="bg-gray-700 text-gray-300">{datetime.time}</Highlighted>
									</div>
									<div className="flex-grow rounded-md">{out}</div>
									<div className="flex items-center gap-2">
										<div
											className="text-[20px] text-gray-400 bg-gray-600 rounded-full p-2 hover:bg-gray-800"
											onClick={() => handleDelete(_id)}
										>
											<MdDeleteOutline />
										</div>
									</div>
								</div>
							) : null
						})
					)}
				</div>
			</div>
		)
	}
}

function MutedContainer({ children, controls, color }: PropsWithChildren & { color?: string; controls?: ReactNode }) {
	return (
		<div className="flex p-2 text-white text-[14px]">
			<div className="flex items-center justify-start flex-grow">
				<Highlighted color={color + " !text-[14px]"}>{children}</Highlighted>
			</div>
			<div className="flex items-center justify-center">{controls}</div>
		</div>
	)
}

function Highlighted({ children, color }: PropsWithChildren & { color?: string }) {
	return <div className={`${color ?? "bg-orange-200 text-black"} text-[14px] px-2 rounded-md`}>{children}</div>
}

function Button({ className, children, small, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { small?: boolean }) {
	return (
		<button
			className={`bg-gray-700 border border-gray-600 px-3 hover:brightness-90 hover:border-orange-300 active:brightness-80 rounded-md text-gray-300 ${
				small ? "text-[14px]" : "py-1"
			} ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}

function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className={`rounded-md border text-white border-gray-600 bg-gray-900 p-1 px-2 outline-none focus:border-orange-300 ${className}`}
			{...props}
		/>
	)
}

function pad(x: number) {
	return x < 10 ? "0" + x : x.toString()
}
