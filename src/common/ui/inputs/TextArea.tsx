import { HTMLAttributes } from "react"
import { baseFormControlClasses, defaultPlaceHolder } from "../base"

export function TextArea({ className, ...props }: HTMLAttributes<HTMLTextAreaElement>) {
	return <textarea placeholder={defaultPlaceHolder} rows={3} {...props} className={`${baseFormControlClasses} resize-none ${className}`} />
}
