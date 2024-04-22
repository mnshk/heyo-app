import logService from "@/services/log/logService"
import { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren, ReactNode, useEffect, useState } from "react"

type PopupProps = {
	open: boolean
	title?: string
	message?: string
	controls?: ReactNode
	noBorder?: boolean
	wrapperProps?: HTMLAttributes<HTMLDivElement>
} & HTMLAttributes<HTMLDivElement> &
	PropsWithChildren

export function PopupWrapper({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...props} className={`fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-75 ${className}`}>
			{props.children}
		</div>
	)
}

export default function Popup({ open, className, children, title, message, controls, noBorder, wrapperProps, ...props }: PopupProps) {
	const [_open, _setOpen] = useState(false)

	useEffect(() => {
		if (open) {
			_setOpen(true)
			logService.create({
				name: "dialog",
				target: {
					label: title ?? "NO_TITLE",
					value: message ? [message] : ["NO_MESSAGE"],
				},
			})
		} else {
			const timeout = setTimeout(() => {
				_setOpen(false)
			}, 200)
			return () => {
				clearTimeout(timeout)
			}
		}
	}, [open, message, title])

	const modifiedWrapperProps = {
		...wrapperProps,
		className: `${open ? "animate-fade-in" : "animate-fade-out"} ${wrapperProps?.className}`,
	}

	return _open ? (
		<PopupWrapper {...modifiedWrapperProps}>
			<div
				{...props}
				className={`bg-white overflow-hidden rounded-3xl w-[80%] max-w-[350px] flex flex-col ${
					!noBorder ? "border shadow-inner" : null
				} ${className}`}
			>
				<div className={`flex-grow flex flex-col text-center gap-4 ${noBorder ? null : "p-[25px]"}`}>
					{title ? <div className="text-[20px] font-bold">{title}</div> : null}
					{message ? <div>{message}</div> : null}
					{children}
				</div>
				<div className="flex justify-end gap-[2px] bg-gray-100">{controls}</div>
			</div>
		</PopupWrapper>
	) : null
}

export function PopupButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button {...props} className={`p-[14px] mt-[2px] w-full disabled:text-blue-300 bg-white text-[#306FDB] ${className}`}>
			{children}
		</button>
	)
}
