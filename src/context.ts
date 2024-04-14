import { Context, createContext, Dispatch, SetStateAction } from "react"

export type RootContextProps = {
	subject: string
	setSubject: Dispatch<SetStateAction<string>>
	// view: ReactNode
	// setView: (view: ReactNode) => void
	// viewHistory: ReactNode[]
}

const RootContext: Context<RootContextProps> = createContext({} as RootContextProps)

export default RootContext
