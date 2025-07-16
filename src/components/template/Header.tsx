import classNames from '@/utils/classNames'
import { HEADER_HEIGHT } from '@/constants/theme.constant'
import type { ReactNode } from 'react'
import type { CommonProps } from '@/@types/common'
import { FaHospitalSymbol } from 'react-icons/fa';

interface HeaderProps extends CommonProps {
    headerStart?: ReactNode
    headerEnd?: ReactNode
    headerMiddle?: ReactNode
    container?: boolean
    wrapperClass?: string
}

const Header = (props: HeaderProps) => {
    const {
        headerStart,
        headerEnd,
        headerMiddle,
        className,
        container,
        wrapperClass,
    } = props

    return (
        <header className={classNames('header', className, 'backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-lg rounded-b-2xl border-b border-primary/10 dark:border-primary/20 transition-all duration-300 z-40')}> {/* Glassmorphic, shadow, rounded */}
            <div
                className={classNames(
                    'header-wrapper flex items-center min-h-[72px] px-6 md:px-12',
                    container && 'container mx-auto',
                    wrapperClass,
                )}
                style={{ height: HEADER_HEIGHT }}
            >
                <div className="header-action header-action-start flex items-center gap-3">
                    {/* Hospital icon accent */}
                    <span className="text-2xl text-primary drop-shadow-md animate-pulse-slow"><FaHospitalSymbol /></span>
                    {headerStart}
                </div>
                {headerMiddle && (
                    <div className="header-action header-action-middle flex-1 flex justify-center">
                        {headerMiddle}
                    </div>
                )}
                <div className="header-action header-action-end flex items-center gap-3">
                    {headerEnd}
                </div>
            </div>
        </header>
    )
}

export default Header
