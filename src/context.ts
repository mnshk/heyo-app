import { Context, createContext, Dispatch, SetStateAction } from "react"

export type RootContextProps = {
	subject: string
	setSubject: Dispatch<SetStateAction<string>>
	isAuthenticated: boolean
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>
	preferredName: string
	setPreferredName: Dispatch<SetStateAction<string>>
}

const RootContext: Context<RootContextProps> = createContext({
	isAuthenticated: false,
} as RootContextProps)

export default RootContext
