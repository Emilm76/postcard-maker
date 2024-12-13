import clsx from 'clsx'
import { InputHTMLAttributes, PropsWithRef } from 'react'

export function RadioInput({
  className,
  name,
  label,
  inputProps,
}: {
  className?: string
  name: string
  label: string
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>
}) {
  return (
    <div className={clsx(className, 'flex gap-[10px] items-center')}>
      <div className="checkbox-radio">
        <input
          {...inputProps}
          type="radio"
          name={name}
          className={clsx(
            inputProps?.className,
            'block  rounded-mySm border-myGrey hover:border-myPurple focus:border-myPurple disabled:cursor-not-allowed disabled:bg-myGrey disabled:text-white'
          )}
        />
      </div>
      <div className="text-info text-myDark">{label}</div>
    </div>
  )
}
