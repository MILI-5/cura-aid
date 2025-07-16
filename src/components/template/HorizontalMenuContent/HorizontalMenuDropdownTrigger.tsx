import { forwardRef } from 'react'
import classNames from '@/utils/classNames'
import HorizontalMenuNavLink from './HorizontalMenuNavLink'
import type { CommonProps } from '@/@types/common'
import type { HorizontalMenuNavLinkProps } from './HorizontalMenuNavLink'
import type { ButtonHTMLAttributes } from 'react'

interface HorizontalMenuDropdownTriggerCommonProps extends CommonProps {
    active?: boolean
}

interface ButtonProps
    extends HorizontalMenuDropdownTriggerCommonProps,
        ButtonHTMLAttributes<HTMLButtonElement> {
    asElement?: 'button'
}

interface AnchorProps
    extends HorizontalMenuNavLinkProps,
        HorizontalMenuDropdownTriggerCommonProps {
    asElement?: 'a'
    path: string
    isExternalLink?: boolean
}

type HorizontalMenuDropdownTriggerProps = ButtonProps | AnchorProps

const HorizontalMenuDropdownTrigger = forwardRef<
    HTMLButtonElement,
    HorizontalMenuDropdownTriggerProps
>((props, ref) => {
    const { className, active, asElement = 'button', ...rest } = props
    const commonProps = {
        className: classNames(
            'horizontal-menu-link',
            className,
            active && 'active',
        ),
    }

    if (asElement === 'a') {
        const { path, isExternalLink, ...anchorProps } = rest as AnchorProps
        return (
            <HorizontalMenuNavLink
                path={path as string}
                isExternalLink={isExternalLink}
                {...commonProps}
                {...anchorProps}
            />
        )
    }

    if (asElement === 'button') {
        return <button ref={ref} {...commonProps} {...(rest as ButtonProps)} />
    }

    return <></>
})

HorizontalMenuDropdownTrigger.displayName = 'HorizontalMenuDropdownTrigger'

export default HorizontalMenuDropdownTrigger
