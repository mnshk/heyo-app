import { Input } from "@/components/common/inputs/Input"
import logService from "@/services/log/logService"
import { InputHTMLAttributes } from "react"

// Array to store phrases typed earlier
const savedValues: string[] = []
// Index for the savedValues array
let index = 0

export default function LoggerInput({ value, onChange, onBlur, ...props }: { value: string } & InputHTMLAttributes<HTMLInputElement>) {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const newValue = e.target.value

		// If the value has changed and the length of the text increased,
		// it means user did not pressed backspace or deleted some text
		if (newValue.length > value.length) {
			// In this case simply overwrite the old value
			savedValues[index] = newValue
		}
		// If length decreased or remained the same that means user might have deleted something
		else {
			// If something exists on the current index and its not empty,
			// we should increment the index to prevent that thing from being overwritten
			if (savedValues[index] !== undefined && savedValues[index].length !== 0) {
				// In this case increment the index so that the saved phrase is not overwritten
				++index
			}
		}
		// If props also passed some onChange handler, execute it
		if (onChange !== undefined) onChange(e)
	}
	function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		// If something exists on the current index and its not empty,
		// we should increment the index to prevent that thing from being overwritten
		if (savedValues[index] !== undefined && savedValues[index].length !== 0) {
			++index
		}
		// Save the latest value on the index
		savedValues[index] = value

		// If props also passed some onBlur handler, execute it
		if (onBlur !== undefined) onBlur(e)
		// At this moment this should send a beacon to log service
		logService.create({ name: "input", target: { label: props.placeholder ?? "NO_LABEL", type: "LoggerInput", value: savedValues } })
	}
	return <Input {...props} onChange={handleChange} onBlur={handleBlur} value={value} />
}
