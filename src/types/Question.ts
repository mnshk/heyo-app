export type IQuestionOption = {
	label: string
	nextQuestion?: string
}

export type IQuestion = {
	question: string
	sensitive?: boolean
	nextQuestion?: string
	options: IQuestionOption[]
}

export type IQuestions = {
	[key: string]: IQuestion
}
