import { HTMLAttributes, PropsWithChildren } from "react"
import { MdOutlineArrowBack } from "react-icons/md"

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

export function ButtonDenySecondary(props: CustomButtonProps) {
	return (
		<Button
			className="text-red-600 border-red-400 border-dotted border-t-0 border-l-0 border-r-0 border-b-2 shadow-none rounded-none px-[0px] py-[0px]"
			{...props}
		/>
	)
}

export function ButtonAccept(props: CustomButtonProps) {
	return <Button className="bg-green-600 border-green-800 text-white" {...props} />
}

export function ButtonDeny(props: CustomButtonProps) {
	return <Button className="bg-red-600 border-red-800 text-white" {...props} />
}

export function ButtonNeutral(props: CustomButtonProps) {
	return <Button className="bg-gray-200 border-gray-400 text-black" {...props} />
}

export function SimpleButton(props: HTMLAttributes<HTMLButtonElement>) {
	return (
		<button className="bg-gray-200 border border-gray-300 p-[2px] px-[20px] text-[14px] hover:brightness-90 active:brightness-75" {...props}>
			{props.children}
		</button>
	)
}

export function BackButton(props: HTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className="text-[24px] bg-gray-500 hover:brightness-50 active:brightness-0 rounded-full w-[60px] h-[40px] flex items-center justify-center text-gray-700 bg-opacity-10"
			{...props}
		>
			<MdOutlineArrowBack />
		</button>
	)
}
