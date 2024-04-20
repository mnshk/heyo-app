import { Dispatch, SetStateAction } from "react"
import { ILoading } from "../../../types/Loading"

export type IAuth = {
	isAuthenticated: boolean
	sessionToken: string | null
	subject: string | null
	networkAddress: string | null
}

export type ISettings = {
	hideSensitiveContentWarning: boolean
}

type IRootContext = {
	auth: IAuth
	setAuth: Dispatch<SetStateAction<IAuth>>
	loading: ILoading
	setLoading: Dispatch<SetStateAction<ILoading>>
	progress: number
	setProgress: Dispatch<SetStateAction<number>>
	settings: ISettings
	setSettings: Dispatch<SetStateAction<ISettings>>
}

export default IRootContext
