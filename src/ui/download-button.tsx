import { ButtonHTMLAttributes } from 'react'
import { Button } from './button'

export function DownloadButton({
  ...props
}: {} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      {...props}
      className="w-full flex justify-center sm:basis-[205px] sm:flex-shrink-0 gap-[10px]"
      variant="primary"
    >
      <div className="flex-shrink-0 basis-6">
        <img src="images/icons/download.svg" />
      </div>
      <div>Скачать</div>
    </Button>
  )
}
