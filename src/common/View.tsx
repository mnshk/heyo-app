import { PropsWithChildren } from "react"
import bg from "../assets/media/bg-2.png"

export default function View(props: PropsWithChildren) {
	return (
		<div
			className="flex-grow flex justify-center animate-in"
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
			}}
		>
			<div className="flex flex-grow max-w-[450px] flex-col justify-center items-center p-10">
				{props.children}
			</div>
		</div>
	)
}

export function ViewMain(props: PropsWithChildren) {
	return (
		<div className="flex flex-grow flex-col items-center justify-center text-center gap-4">
			{props.children}
		</div>
	)
}

export function ViewAction(props: PropsWithChildren) {
	return <div className="flex gap-2 flex-col w-full">{props.children}</div>
}

export function ViewHeading(props: PropsWithChildren) {
	return <div className="text-[24px] font-bold mb-2">{props.children}</div>
}
