import React, { MouseEvent } from 'react'
import cx from 'classnames'
import styles from './Button.module.css'

export enum ButtonColor {
  green = 'green',
  orange = 'orange',
}

export interface ButtonProps {
  /**
   * Label of the button.
   */
  label?: string
  /**
   * Optional click handler
   */
  onClick?: (e: MouseEvent) => void
  disabled?: boolean
  color?: ButtonColor
  children?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  label,
  children,
  disabled,
  color,
  ...props
}) => {
  if (children && !label) {
    return (
      <span className={cx(styles.buttonRaw)} {...props}>
        {children}
      </span>
    )
  }
  return (
    <button
      type="button"
      className={cx(
        styles.button,
        color && {
          [styles[color]]: true,
        }
      )}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  )
}
