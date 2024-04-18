import { HTMLAttributes, PropsWithChildren } from "react"
import { MdOutlineArrowBack, MdOutlineArrowForward } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export type ButtonProps = {
	className?: HTMLAttributes<HTMLDivElement>["className"]
} & PropsWithChildren &
	HTMLAttributes<HTMLButtonElement>

export type CustomButtonProps = PropsWithChildren & HTMLAttributes<HTMLButtonElement>

export function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button
			className={`py-3 px-8 rounded-lg text-[16px] font-semibold border-2 shadow-inner bg-opacity-75 hover:brightness-90 transition-all ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}

export function ButtonDenySecondary({ className, ...props }: CustomButtonProps) {
	return (
		// <Button
		// 	{...props}
		// 	// className="text-red-600 border-red-400 border-dotted border-0 bg-black bg-opacity-5 px-[20px] py-[2px] rounded-lg"
		// 	className="text-red-600 border-red-400 border-dotted border-0 shadow-none border-b-2 px-[0px] py-[0px] rounded-none"
		// 	style={{
		// 		fontSize: "14px",
		// 	}}
		// />
		<button {...props} className={`text-red-600 underline text-[14px] ${className}`}>
			{props.children}
		</button>
	)
}

export function ButtonAccept({ className, ...props }: CustomButtonProps) {
	return <Button className={`bg-green-600 border-green-800 text-white ${className}`} {...props} />
}

export function ButtonDeny({ className, ...props }: CustomButtonProps) {
	return <Button className={`bg-red-600 border-red-800 text-white ${className}`} {...props} />
}

export function ButtonNeutral({ className, ...props }: CustomButtonProps) {
	return <Button className={`bg-gray-200 border-gray-400 text-black ${className}`} {...props} />
}

export function SimpleButton(props: HTMLAttributes<HTMLButtonElement>) {
	return (
		<button className="bg-gray-200 border border-gray-300 p-[2px] px-[20px] text-[14px] hover:brightness-90 active:brightness-75" {...props}>
			{props.children}
		</button>
	)
}

export function NavButton(props: HTMLAttributes<HTMLButtonElement> & { direction: "forward" | "backward" }) {
	const navigate = useNavigate()

	return (
		<button
			className="text-[24px] bg-gray-500 hover:brightness-50 active:brightness-0 rounded-full w-[60px] h-[40px] flex items-center justify-center text-gray-700 bg-opacity-10"
			{...props}
			title="back_button"
			onClick={() => navigate(props.direction === "forward" ? 1 : -1)}
		>
			{props.direction === "forward" ? (
				<MdOutlineArrowForward className="pointer-events-none" />
			) : (
				<MdOutlineArrowBack className="pointer-events-none" />
			)}
		</button>
	)
}
