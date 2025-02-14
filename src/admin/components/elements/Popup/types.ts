import { CSSProperties } from 'react';

export type Props = {
    className?: string
    render?: (any) => void,
    children?: React.ReactNode,
    horizontalAlign?: 'left' | 'center' | 'right',
    size?: 'small' | 'large' | 'wide',
    color?: 'light' | 'dark',
    buttonType?: 'default' | 'custom' | 'none',
    button?: React.ReactNode,
    forceOpen?: boolean
    showOnHover?: boolean,
    initActive?: boolean,
    onToggleOpen?: (active: boolean) => void,
    backgroundColor?: CSSProperties['backgroundColor'],
    padding?: CSSProperties['padding'],
}
