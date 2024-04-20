import { PropsWithChildren } from 'react'

type ContainerProps = PropsWithChildren & {
	className?: string
	row?: boolean
	noGrow?: boolean
	noCenter?: boolean
}

export default function Container({ row, noGrow, noCenter, className, children }: ContainerProps) {
	return <div className={`flex w-full ${!row && 'flex-col'} ${!noGrow && 'flex-grow h-0'} ${!noCenter && 'items-center justify-center'} ${className}`}>{children}</div>
}
