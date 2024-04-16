import { Context, createContext, Dispatch, SetStateAction } from "react"

export type ILoading = {
	isLoading: boolean
	to?: string
	random?: boolean
	delay?: "short" | "medium" | "long"
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
}

const RootContext: Context<RootContextProps> = createContext({
	isAuthenticated: false,
} as RootContextProps)

export default RootContext
