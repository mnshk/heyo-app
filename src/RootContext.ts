import { Context, createContext } from "react"
import { IRootContext } from "./types/RootContext"

const RootContext: Context<IRootContext> = createContext({} as IRootContext)

export default RootContext
