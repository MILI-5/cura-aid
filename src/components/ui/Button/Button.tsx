import { forwardRef } from 'react'
import classNames from '../utils/classNames'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { CONTROL_SIZES, SIZES } from '../utils/constants'
import { Spinner } from '../Spinner'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type {
    ReactNode,
    ComponentPropsWithRef,
    MouseEvent,
    ElementType,
} from 'react'
import { motion } from 'framer-motion';

export interface ButtonProps
    extends CommonProps,
        Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
    asElement?: ElementType
    active?: boolean
    block?: boolean
    clickFeedback?: boolean
    customColorClass?: (state: {
        active: boolean
        unclickable: boolean
    }) => string
    disabled?: boolean
    icon?: string | ReactNode
    loading?: boolean
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    shape?: TypeAttributes.Shape
    size?: TypeAttributes.Size
    variant?: 'solid' | 'plain' | 'default'
    iconAlignment?: 'start' | 'end'
}

type ButtonColor = {
    bgColor: string
    hoverColor: string
    activeColor: string
    textColor: string
}

const radiusShape: Record<TypeAttributes.Shape, string> = {
    round: 'rounded-xl',
    circle: 'rounded-full',
    none: 'rounded-none',
}

// Utility to check if a color is "dark" enough for white text
function isColorDark(hex: string) {
    if (!hex) return true;
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    // Luminance formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.6;
}

const vibrantShadow = '0 4px 16px rgba(56,189,248,0.18), 0 1.5px 8px rgba(16,185,129,0.10)';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        asElement: Component = 'button',
        active = false,
        block = false,
        children,
        className,
        clickFeedback = true,
        customColorClass,
        disabled,
        icon,
        loading = false,
        shape = 'round',
        size,
        variant = 'default',
        iconAlignment = 'start',
        ...rest
    } = props
    const { controlSize, ui } = useConfig()
    const formControlSize = useForm()?.size
    const inputGroupSize = useInputGroup()?.size
    const defaultClass = 'button'
    const sizeIconClass = 'inline-flex items-center justify-center'

    const buttonSize = size || inputGroupSize || formControlSize || controlSize
    const feedback = !ui?.button?.disableClickFeedback || clickFeedback
    const unclickable = disabled || loading

    const getButtonSize = () => {
        let sizeClass = ''
        switch (buttonSize) {
            case SIZES.LG:
                sizeClass = classNames(
                    CONTROL_SIZES.lg.h,
                    radiusShape[shape],
                    icon && !children
                        ? `${CONTROL_SIZES.lg.w} ${sizeIconClass} text-2xl`
                        : 'px-8 py-2 text-base',
                )
                break
            case SIZES.SM:
                sizeClass = classNames(
                    CONTROL_SIZES.sm.h,
                    shape === 'round' ? 'rounded-xl' : radiusShape[shape],
                    icon && !children
                        ? `${CONTROL_SIZES.sm.w} ${sizeIconClass} text-lg`
                        : 'px-3 py-2 text-sm',
                )
                break
            case SIZES.XS:
                sizeClass = classNames(
                    CONTROL_SIZES.xs.h,
                    shape === 'round' ? 'rounded-lg' : radiusShape[shape],
                    icon && !children
                        ? `${CONTROL_SIZES.xs.w} ${sizeIconClass} text-base`
                        : 'px-3 py-1 text-xs',
                )
                break
            default:
                sizeClass = classNames(
                    CONTROL_SIZES.md.h,
                    radiusShape[shape],
                    icon && !children
                        ? `${CONTROL_SIZES.md.w} ${sizeIconClass} text-xl`
                        : 'px-5 py-2',
                )
                break
        }
        return sizeClass
    }

    const disabledClass = 'bg-gray-200 text-gray-400 cursor-not-allowed';

    const solidColor = () => {
        // Try to get the CSS variable for primary color
        let primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#2a85ff';
        // Fallback for tenant-primary
        if (!primary || primary === '') {
            primary = getComputedStyle(document.documentElement).getPropertyValue('--tenant-primary').trim() || '#2a85ff';
        }
        const useWhiteText = isColorDark(primary);
        const btn = {
            bgColor: active ? `bg-primary-deep` : `bg-primary`,
            textColor: useWhiteText ? 'text-neutral' : 'text-gray-900',
            hoverColor: active ? '' : `hover:bg-primary-mild`,
            activeColor: ``,
        };
        return getBtnColor(btn);
    };

    const plainColor = () => {
        const btn = {
            bgColor: active
                ? ``
                : `dark:primary-mild dark:bg-opacity-20`,
            textColor: ``,
            hoverColor: active ? '' : `hover:text-primary-mild`,
            activeColor: `dark:active:primary-mild dark:active:bg-opacity-40`,
        }
        return getBtnColor(btn)
    }

    const defaultColor = () => {
        const btn = {
            bgColor: active
                ? `bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500`
                : `bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700`,
            textColor: `text-gray-600 dark:text-gray-100`,
            hoverColor: active
                ? ''
                : `ring-primary dark:ring-white hover:border-primary dark:hover:border-white hover:ring-1 hover:text-primary dark:hover:text-white dark:hover:bg-transparent`,
            activeColor: ``,
        }
        return getBtnColor(btn)
    }

    const getBtnColor = ({
        bgColor,
        hoverColor,
        activeColor,
        textColor,
    }: ButtonColor) => {
        return `${bgColor} ${
            unclickable ? disabledClass : hoverColor + ' ' + activeColor
        } ${textColor}`
    }

    const btnColor = () => {
        switch (variant) {
            case 'solid':
                return solidColor()
            case 'plain':
                return plainColor()
            case 'default':
                return defaultColor()
            default:
                return defaultColor()
        }
    }

    const classes = classNames(
        defaultClass,
        btnColor(),
        getButtonSize(),
        className,
        block ? 'w-full' : '',
        feedback && !unclickable && 'button-press-feedback',
        customColorClass?.({
            active,
            unclickable,
        }),
        'transition-all duration-200',
        'shadow',
    )

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const { onClick } = props
        if (unclickable) {
            e.preventDefault()
            return
        }
        onClick?.(e)
    }

    const renderChildren = () => {
        if (loading && children) {
            return (
                <span className="flex items-center justify-center">
                    <Spinner enableTheme={false} className="mr-1" />
                    {children}
                </span>
            )
        }

        if (icon && !children && loading) {
            return <Spinner enableTheme={false} />
        }

        if (icon && !children && !loading) {
            return <>{icon}</>
        }

        if (icon && children && !loading) {
            return (
                <span className="flex gap-1 items-center justify-center">
                    {iconAlignment === 'start' && (
                        <span className="text-lg">{icon}</span>
                    )}
                    <span>{children}</span>
                    {iconAlignment === 'end' && (
                        <span className="text-lg">{icon}</span>
                    )}
                </span>
            )
        }

        return <>{children}</>
    }

    return (
        <motion.button
            ref={ref}
            className={classes}
            type={rest.type || 'button'}
            disabled={unclickable}
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            {...rest}
        >
            {loading && <Spinner className="mr-2" size={buttonSize} />}
            {icon && iconAlignment === 'start' && <span className="mr-2">{icon}</span>}
            {children}
            {icon && iconAlignment === 'end' && <span className="ml-2">{icon}</span>}
        </motion.button>
    );
})

Button.displayName = 'Button'

export default Button
