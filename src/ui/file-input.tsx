import clsx from 'clsx'
import { InputHTMLAttributes, PropsWithRef } from 'react'
import { Button } from './button'

export function FileInput({
  className,
  error,
  inputProps,
}: {
  className?: string
  label?: string
  error?: string
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>
}) {
  // TODO: Изменять текст, если иконка загружена

  return (
    <div className={className}>
      <div className="file-input relative flex flex-col items-start gap-[10px] sm:flex-row sm:gap-6 sm:items-center">
        <Button
          variant="primary"
          className="flex sm:basis-[205px] sm:flex-shrink-0 gap-[10px]"
        >
          <div className="flex-shrink-0 basis-6">
            <img src="images/icons/upload.svg" />
          </div>
          <div>Прикрепить</div>
        </Button>

        <div className="text-myGrey">
          Прикрепите файл в формате .svg или .png
        </div>

        <input
          {...inputProps}
          type="file"
          className={clsx(
            inputProps?.className,
            'absolute top-0 left-0 block w-full h-full opacity-0 cursor-pointer'
          )}
        />
      </div>
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  )
}
