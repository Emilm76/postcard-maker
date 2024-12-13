import clsx from 'clsx'
import { InputHTMLAttributes, PropsWithRef, useId } from 'react'

export function CheckboxInput({
  className,
  label,
  inputProps,
}: {
  className?: string
  label: string
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>
}) {
  const id = inputProps?.id || useId()

  return (
    <div className={clsx(className, 'flex items-center')}>
      <input
        {...inputProps}
        id={id}
        type="checkbox"
        className={clsx(
          inputProps?.className,
          'block basis-6 shrink-0 rounded-[5px] w-6 h-6 border-myGrey hover:border-myPurple focus:border-myPurple disabled:cursor-not-allowed disabled:bg-myGrey disabled:text-white'
        )}
      />
      <label
        htmlFor={id}
        className="inline-block pl-[10px] text-info text-myDark"
      >
        {label}
      </label>
    </div>
  )
}
