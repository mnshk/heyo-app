import { HTMLAttributes } from "react"
import bg from "@/assets/media/bg-2.png"

type ViewProps = {
	noAnimation?: boolean
	wrapperProps?: HTMLAttributes<HTMLDivElement>
} & HTMLAttributes<HTMLDivElement>

export default function View({ noAnimation, className, wrapperProps, ...props }: ViewProps) {
	const wrapperPropsWithClassName = {
		...wrapperProps,
		className: `flex-grow flex flex-col items-center h-full overflow-auto bg-cover origin-center ${noAnimation ? "" : "animate-page-in"} ${
			wrapperProps?.className
		}`,
	}

	return (
		<div
			style={{
				backgroundImage: `url(${bg})`,
			}}
			{...wrapperPropsWithClassName}
		>
			<div {...props} className={`flex flex-grow flex-col items-center w-full max-w-[450px] p-10 ${className}`}>
				{props.children}
			</div>
		</div>
	)
}

export function ViewMain({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={`flex flex-grow flex-col items-center justify-center text-center gap-4 ${className}`}>{props.children}</div>
}

export function ViewAction({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={`flex gap-2 flex-col w-full ${className}`}>{props.children}</div>
}
export function ViewHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={`flex gap-2 w-full ${className}`}>{props.children}</div>
}

export function ViewHeading({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={`text-[24px] font-bold mb-2 ${className}`}>{props.children}</div>
}
