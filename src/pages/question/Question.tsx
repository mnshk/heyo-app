import Popup, { PopupButton } from "@/common/ui/popup/Popup"
import { TQuestions } from "@/types/Question"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../common/Footer"
import { ButtonDenySecondary, ButtonNeutral } from "../../common/ui/buttons/Buttons"
import View, { ViewAction, ViewHeader, ViewHeading, ViewMain } from "../../common/ui/containers/view/View"
import RootContext from "../../context"
import _questions from "../../data/questions.json"
import { MdInfoOutline } from "react-icons/md"
const questions = _questions as TQuestions

export default function Question() {
	const [wrapperLoadingClass, setWrapperLoadingClass] = useState("")
	const [iDoNotCarePopupOpen, setIDoNotCarePopupOpen] = useState(false)
	const [showSensitiveContent, setShowSensitiveContent] = useState(true)
	const { loading, setLoading, progress, setProgress, hideSensitiveContentWarning, setHideSensitiveContentWarning } = useContext(RootContext)
	const { questionIdentifier } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (loading.isLoading) {
			setWrapperLoadingClass("")
		} else {
			setWrapperLoadingClass("animate-page-in")
			setShowSensitiveContent(false)
		}
	}, [loading.isLoading])

	if (questionIdentifier !== undefined) {
		const current = questions[questionIdentifier]
		return (
			<>
				<View
					noAnimation
					wrapperProps={{ className: wrapperLoadingClass }}
					className={`gap-[20px] ${current.sensitive ? "bg-red-200" : null}`}
				>
					{/* <ViewHeader>
					<NavButton direction="backward" />
					<div className="flex-grow flex justify-center items-center">
						<div className="bg-gray-300 w-[100px] h-[10px] rounded-md overflow-hidden">
							<div
								className={`bg-green-500 h-full rounded-md`}
								style={{
									width: `${progress}%`,
								}}
							></div>
						</div>
					</div>
					<NavButton direction="forward" />
				</ViewHeader> */}
					<ViewHeader>
						<div className="flex-grow flex items-center justify-center gap-[6px] text-gray-500 text-[12px]">
							{current.sensitive ? (
								<>
									<MdInfoOutline className="text-[14px] mb-[1px]" />
									Sensitive Content
								</>
							) : (
								""
							)}
						</div>
					</ViewHeader>
					<ViewMain>
						<ViewHeading>{current.question}</ViewHeading>
					</ViewMain>
					<ViewAction>
						{current.options.map((option) => (
							<ButtonNeutral
								key={option.label}
								className="w-full"
								onClick={() => {
									setLoading({
										isLoading: true,
										to: option.nextQuestion ?? current.nextQuestion!,
									})
									setProgress(progress + 10)
								}}
							>
								{option.label}
							</ButtonNeutral>
						))}
					</ViewAction>
					<ButtonDenySecondary className="mt-5" onClick={() => setIDoNotCarePopupOpen(true)}>
						I don't care. Get me out
					</ButtonDenySecondary>
					<Footer />
					<Popup
						open={iDoNotCarePopupOpen}
						title="Are you sure?"
						message="You will not be able to access this page ever again."
						controls={
							<>
								<PopupButton onClick={() => setIDoNotCarePopupOpen(false)}>No</PopupButton>
								<PopupButton onClick={() => navigate("/goodbye")}>Yes</PopupButton>
							</>
						}
					/>
				</View>

				<Popup
					open={Boolean(current.sensitive) && !showSensitiveContent && !hideSensitiveContentWarning}
					title="Sensitive Question"
					message="Next question might be inappropriate or offensive, you can skip this question if you want"
					wrapperProps={{
						className: "backdrop-blur-lg",
					}}
					controls={
						<>
							<PopupButton onClick={() => setLoading({ isLoading: true, to: current.nextQuestion! })}>Skip</PopupButton>
							<PopupButton
								onClick={() => {
									setShowSensitiveContent(true)
									setHideSensitiveContentWarning(
										(document.getElementById("input-hide-sensitive-content-warning-permanently") as HTMLInputElement).checked
									)
								}}
							>
								Continue
							</PopupButton>
						</>
					}
				>
					{
						<div className="flex gap-[10px] items-center justify-center pt-10">
							<input type="checkbox" id="input-hide-sensitive-content-warning-permanently" className="scale-125" />
							<label htmlFor="input-hide-sensitive-content-warning-permanently">Don't show this warning again</label>
						</div>
					}
				</Popup>
			</>
		)
	} else return <div>Question undefined</div>
}
