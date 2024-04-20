export type QuestionOption = {
	label: string
	nextQuestion?: string
}

export type Question = {
	question: string
	sensitive?: boolean
	nextQuestion?: string
	options: QuestionOption[]
}

export type Questions = {
	[key: string]: Question
}
