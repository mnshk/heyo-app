export type ILoading = {
	isLoading: boolean
	navigateTo?: string
	callback?: () => void
	delay?: "short" | "medium" | "long"
}
