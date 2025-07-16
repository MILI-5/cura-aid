import Button from '@/components/ui/Button'
import { TbDots } from 'react-icons/tb'
import type { ButtonProps } from '@/components/ui/Button'

type EllipsisButtonProps = ButtonProps

const EllipsisButton = (props: EllipsisButtonProps) => {
    const { shape = 'circle', variant = 'plain', size = 'xs', 'aria-label': ariaLabel, ...rest } = props

    return (
        <Button
            shape={shape}
            variant={variant}
            size={size}
            icon={<TbDots />}
            aria-label={ariaLabel || 'More options'}
            {...rest}
        />
    )
}

export default EllipsisButton
