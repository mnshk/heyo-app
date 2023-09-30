export default function Screen({ children }: React.PropsWithChildren) {
	return (
		<div className='flex flex-col flex-grow justify-center items-center'>
			{children}
		</div>
	)
}
