import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

export function Button({
  className,
  variant,
  ...props
}: {
  variant: 'primary' | 'outlined'
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        className,
        'rounded-mySm text-center font-normal transition-all',
        {
          primary:
            'px-6 py-4 shadow-sm bg-myPurple text-white focus:outline-none hover:bg-myPurpleLight disabled:bg-myGrey disabled:cursor-not-allowed',
          outlined:
            'px-8 py-[18px] shadow-sm border-2 border-white bg-transparent text-white hover:border-myPurpleLight hover:text-myPurpleLight disabled:cursor-not-allowed',
        }[variant]
      )}
    />
  )
}
