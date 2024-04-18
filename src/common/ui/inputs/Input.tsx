import { HTMLAttributes } from "react"
import { baseFormControlClasses, defaultPlaceHolder } from "../base"

export function Input({ className, ...props }: HTMLAttributes<HTMLInputElement>) {
	return <input placeholder={defaultPlaceHolder} {...props} className={`${baseFormControlClasses} ${className}`} />
}
