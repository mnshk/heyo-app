import { Dispatch, SetStateAction } from "react"
import { LoadingProps } from "./Loading"

export type RootContextProps = {
	// Subject
	subject: string
	setSubject: Dispatch<SetStateAction<string>>

	// Loading
	loading: LoadingProps
	setLoading: Dispatch<SetStateAction<LoadingProps>>

	// Progress
	progress: number
	setProgress: Dispatch<SetStateAction<number>>

	// Sensitive content
	hideSensitiveContentWarning: boolean
	setHideSensitiveContentWarning: Dispatch<SetStateAction<boolean>>
}
