import { Context, createContext, Dispatch, SetStateAction } from "react"

export type ILoading = {
	isLoading: boolean
	to: string
	delay?: "short" | "medium" | "long"
	callback?: (to: string) => void
}

export type RootContextProps = {
	subject: string
	setSubject: Dispatch<SetStateAction<string>>
	isAuthenticated: boolean
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>
	preferredName: string
	setPreferredName: Dispatch<SetStateAction<string>>
	loading: ILoading
	setLoading: Dispatch<SetStateAction<ILoading>>
	progress: number
	setProgress: Dispatch<SetStateAction<number>>
	hideSensitiveContentWarning: boolean
	setHideSensitiveContentWarning: Dispatch<SetStateAction<boolean>>
}

const RootContext: Context<RootContextProps> = createContext({
	isAuthenticated: false,
} as RootContextProps)

export default RootContext
