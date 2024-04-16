import { Context, createContext, Dispatch, SetStateAction } from "react"

export type RootContextProps = {
	subject: string
	setSubject: Dispatch<SetStateAction<string>>
	isAuthenticated: boolean
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>
	preferredName: string
	setPreferredName: Dispatch<SetStateAction<string>>
	loading: boolean
	setLoading: Dispatch<SetStateAction<boolean>>
}

const RootContext: Context<RootContextProps> = createContext({
	isAuthenticated: false,
} as RootContextProps)

export default RootContext
