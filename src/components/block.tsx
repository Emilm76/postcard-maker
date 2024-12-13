import clsx from 'clsx'
import { ReactNode } from 'react'

export function Block({
  info,
  title,
  children,
  bodyClassName,
}: {
  info: string
  title: string
  children: ReactNode
  bodyClassName?: string
}) {
  return (
    <div className="max-lg:p-5 max-lg:bg-white max-lg:rounded-myMd lg:flex lg:gap-[10px]">
      <div className="lg:basis-[33%] lg:flex-shrink-0 pb-4 lg:p-[30px] lg:rounded-myMd lg:bg-white max-lg:border-b-[1px] max-lg:border-b-myGreyLight">
        <div className="text-info mb-[5px]">{info}</div>
        <h2 className="text-myPurple">{title}</h2>
      </div>
      <div
        className={clsx(
          bodyClassName,
          'lg:flex-grow pt-4 lg:p-[30px] lg:rounded-myMd lg:bg-white'
        )}
      >
        {children}
      </div>
    </div>
  )
}
