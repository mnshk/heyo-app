export type TQuestionOption = {
	label: string
	nextQuestion?: string
}

export type TQuestion = {
	question: string
	sensitive?: boolean
	nextQuestion?: string
	options: TQuestionOption[]
}

export type TQuestions = {
	[key: string]: TQuestion
}
