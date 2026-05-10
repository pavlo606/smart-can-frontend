import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'outline' | 'danger' | 'ghost' | 'noBg'
type Size = 'sm' | 'md' | 'lg'

interface IconProps {
  size?: number
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  Icon?: React.ComponentType<IconProps>
}

export const Button = ({
  className,
  children,
  Icon,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'select-none cursor-pointer inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-default gap-2',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children && <span>{children}</span>}
    </button>
  )
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
  outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-200',
  noBg: 'bg-transparent text-gray-700 hover:bg-transparent hover:text-gray-500',
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
}
