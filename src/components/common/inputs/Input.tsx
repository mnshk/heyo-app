import { InputHTMLAttributes } from "react"
import { baseFormControlClasses, defaultPlaceHolder } from "../base"

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
	return <input placeholder={defaultPlaceHolder} {...props} className={`${baseFormControlClasses} ${className}`} />
}
