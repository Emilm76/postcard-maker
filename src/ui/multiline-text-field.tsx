import clsx from 'clsx'
import { PropsWithRef, TextareaHTMLAttributes } from 'react'

export function MultilineTextField({
  className,
  error,
  textareaProps,
}: {
  className?: string
  error?: string | false
  textareaProps?: PropsWithRef<TextareaHTMLAttributes<HTMLTextAreaElement>>
}) {
  return (
    <div className={className}>
      <textarea
        {...textareaProps}
        className={clsx(
          textareaProps?.className,
          'block w-full rounded-mySm border-myGrey hover:border-myPurple focus:border-myPurple disabled:cursor-not-allowed disabled:bg-myGrey disabled:text-white'
        )}
      />
      {error && <div className="mt-2 text-rose-400 text-info">{error}</div>}
    </div>
  )
}
