export type LoadingProps = {
	isLoading: boolean
	navigateTo?: string
	callback?: () => void
	delay?: "short" | "medium" | "long"
}
