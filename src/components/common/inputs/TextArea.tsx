import { TextareaHTMLAttributes } from "react"
import { baseFormControlClasses, defaultPlaceHolder } from "../base"

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return <textarea placeholder={defaultPlaceHolder} rows={3} {...props} className={`${baseFormControlClasses} resize-none ${className}`} />
}
