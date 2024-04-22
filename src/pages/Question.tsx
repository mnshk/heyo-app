import Popup, { PopupButton } from "@/components/common/popup/Popup"
import { IQuestions } from "@/types/Question"
import { useContext, useState } from "react"
import { MdInfoOutline } from "react-icons/md"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import { ButtonDenySecondary, ButtonNeutral } from "../components/common/buttons/Buttons"
import View, { ViewAction, ViewHeader, ViewHeading, ViewMain } from "../components/common/containers/View"
import RootContext from "../context/root"
import _questions from "../data/questions.json"
const questions = _questions as IQuestions

export default function Question() {
	const { questionIdentifier } = useParams()
	const { pathname } = useLocation()
	const [iDoNotCarePopupOpen, setIDoNotCarePopupOpen] = useState(false)
	const [showSensitiveContent, setShowSensitiveContent] = useState(true)
	const { setLoading, settings, setSettings } = useContext(RootContext)
	const navigate = useNavigate()

	if (questionIdentifier !== undefined) {
		const current = questions[questionIdentifier]
		return (
			<>
				<View className={`gap-[20px] ${current.sensitive ? "bg-red-200" : null}`} key={pathname}>
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
					<ViewAction className="flex-grow">
						{current.options.map((option) => (
							<ButtonNeutral
								key={option.label}
								className={`w-full active:bg-red-500 active:bg-opacity-25`}
								onClick={() => {
									const next = option.nextQuestion ?? current.nextQuestion!
									sessionStorage.setItem("lastQuestion", next)
									setTimeout(() => {
										navigate("/question/" + next, {
											replace: true,
										})
									}, 300)
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
					open={Boolean(current.sensitive) && !showSensitiveContent && !settings.hideSensitiveContentWarning}
					title="Sensitive Question"
					message="Next question might be inappropriate or offensive, you can skip this question if you want"
					wrapperProps={{
						className: "backdrop-blur-lg",
					}}
					controls={
						<>
							<PopupButton onClick={() => setLoading({ isLoading: true, navigateTo: current.nextQuestion! })}>Skip</PopupButton>
							<PopupButton
								onClick={() => {
									setShowSensitiveContent(true)
									setSettings((prev) => ({
										...prev,
										hideSensitiveContentWarning: (
											document.getElementById("input-hide-sensitive-content-warning-permanently") as HTMLInputElement
										).checked,
									}))
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
