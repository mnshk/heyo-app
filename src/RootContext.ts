import { Context, createContext } from "react"
import { RootContextProps } from "./types/RootContext"

const RootContext: Context<RootContextProps> = createContext({} as RootContextProps)

export default RootContext
