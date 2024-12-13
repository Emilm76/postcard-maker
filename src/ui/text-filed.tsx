import clsx from 'clsx'
import { InputHTMLAttributes, PropsWithRef, useId } from 'react'

export function TextField({
  className,
  label,
  error,
  inputProps,
}: {
  className?: string
  label?: string
  error?: string | false
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>
}) {
  const id = inputProps?.id || useId()

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="inline-block mb-[10px]">
          {label}
        </label>
      )}
      <input
        {...inputProps}
        id={id}
        className={clsx(
          inputProps?.className,
          'block w-full rounded-mySm border-myGrey hover:border-myPurple focus:border-myPurple disabled:cursor-not-allowed disabled:bg-myGrey disabled:text-white'
        )}
      />
      {error && <div className="mt-2 text-rose-400 text-info">{error}</div>}
    </div>
  )
}
