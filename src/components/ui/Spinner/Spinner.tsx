import { forwardRef } from 'react'
import classNames from 'classnames'
import { CgSpinner } from 'react-icons/cg'
import type { CommonProps } from '../@types/common'
import type { ElementType } from 'react'

export interface SpinnerProps extends CommonProps {
    customColorClass?: string
    enableTheme?: boolean
    indicator?: ElementType
    isSpining?: boolean
    size?: string | number
}

// Healthcare-themed spinner: spinning medical cross
const MedicalCrossSpinner = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="20" y="4" width="8" height="40" rx="4" fill="currentColor" />
    <rect x="4" y="20" width="40" height="8" rx="4" fill="currentColor" />
  </svg>
);

const Spinner = forwardRef((props: SpinnerProps, ref) => {
    const {
        className,
        customColorClass,
        enableTheme = true,
        indicator: Component = MedicalCrossSpinner,
        isSpining = true,
        size = 32,
        style,
        ...rest
    } = props

    const spinnerColor = customColorClass || (enableTheme && 'text-primary')

    const spinnerStyle = {
        height: size,
        width: size,
        ...style,
    }

    const spinnerClass = classNames(
        isSpining && 'animate-spin',
        spinnerColor,
        className,
    )

    return (
        <Component
            ref={ref}
            style={spinnerStyle}
            className={spinnerClass}
            {...rest}
        />
    )
})

Spinner.displayName = 'Spinner'

export default Spinner
