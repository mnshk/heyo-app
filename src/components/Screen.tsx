export interface IScreen {
	className?: string
	children?: React.ReactNode
}

export default function Screen({ className, children }: IScreen) {
	return <div className={`flex flex-col flex-grow justify-center items-center ${className}`}>{children}</div>
}
