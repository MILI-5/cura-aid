import { forwardRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import type { CommonProps } from '../@types/common'
import type { ReactNode, ComponentPropsWithRef, MouseEvent } from 'react'
import { motion } from 'framer-motion';

type CardHeader = {
    content?: string | ReactNode
    className?: string
    bordered?: boolean
    extra?: string | ReactNode
}

type CardFooter = {
    content?: string | ReactNode
    className?: string
    bordered?: boolean
}

export interface CardProps
    extends CommonProps,
        Omit<ComponentPropsWithRef<'div'>, 'onClick'> {
    clickable?: boolean
    header?: CardHeader
    bodyClass?: string
    footer?: CardFooter
    bordered?: boolean
    onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const defaultHeaderConfig: CardHeader = {
    bordered: true,
}

const defaultFooterConfig: CardHeader = {
    bordered: true,
}

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const { ui } = useConfig()

    const {
        bodyClass,
        children,
        className,
        clickable = false,
        bordered = ui?.card?.cardBordered ?? true,
        header = {},
        footer = {},
        onClick,
        ...rest
    } = props

    const headerProps = {
        ...defaultHeaderConfig,
        ...header,
    }

    const footerProps = {
        ...defaultFooterConfig,
        ...footer,
    }

    const cardClass = classNames(
        'card',
        className,
        bordered ? `card-border` : `card-shadow`,
        clickable && 'cursor-pointer user-select-none',
    )

    const cardBodyClasss = classNames('card-body', bodyClass)
    const cardHeaderClass = classNames(
        'card-header',
        headerProps.bordered && 'card-header-border',
        headerProps.extra && 'card-header-extra',
        headerProps.className,
    )
    const cardFooterClass = classNames(
        'card-footer',
        footerProps.bordered && `card-footer-border`,
        footerProps.className,
    )

    const renderHeader = () => {
        if (typeof headerProps.content === 'string') {
            return <h4>{headerProps.content}</h4>
        }
        return <>{headerProps.content}</>
    }

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        onClick?.(e)
    }

    // Remove onDrag, onAnimation, and related events from rest to avoid type conflict with motion.div
    const { onDrag, onDragEnd, onDragStart, onDragOver, onAnimationStart, onAnimationEnd, onTransitionEnd, ...motionRest } = rest;
    return (
        <motion.div
            ref={ref}
            className={cardClass}
            role="presentation"
            onClick={handleClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: clickable ? 1.03 : 1, boxShadow: clickable ? '0 4px 24px rgba(56,189,248,0.12)' : undefined }}
            transition={{ duration: 0.5 }}
            {...motionRest}
        >
            {headerProps.content && (
                <div className={cardHeaderClass}>
                    {renderHeader()}
                    {headerProps.extra && <span>{headerProps.extra}</span>}
                </div>
            )}
            <div className={cardBodyClasss}>{children}</div>
            {footerProps.content && (
                <div className={cardFooterClass}>{footerProps.content}</div>
            )}
        </motion.div>
    )
})

Card.displayName = 'Card'

export default Card
