import clsx from 'clsx'
import { ReactNode } from 'react'

export function Modal({
  title,
  children,
  isOpen,
  closeCallback,
}: {
  title?: string
  children?: ReactNode
  isOpen?: boolean
  closeCallback?: () => void
}) {
  // TODO: Закрывать при нажатии на клавишу esc

  return (
    <>
      {/* Background */}
      <div
        className={clsx(
          'fixed inset-0 z-10 bg-gray-950/45 transition-opacity',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      ></div>

      {/* Modal window */}
      <div
        className={clsx(
          'fixed inset-0 z-50 flex justify-center items-center p-4 transition-opacity',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className={clsx(
            'bg-white rounded-myMd shadow-md w-full max-w-[480px] sm:max-w-[760px] max-lg:mt-[80px] transition-all',
            isOpen
              ? 'scale-100 opacity-100 pointer-events-auto'
              : 'scale-75 opacity-0 pointer-events-none'
          )}
        >
          <div className="relative p-10 px-5 lg:px-0">
            <button
              onClick={closeCallback}
              type="button"
              className="absolute -top-[78px] right-0 lg:top-0 lg:-right-[88px] shadow-md rounded-myMd p-4 bg-white transition-colors hover:bg-gray-50"
            >
              <img src="images/icons/close.svg" />
            </button>
            {title && <h1 className="text-center pb-5 sm:pb-10">{title}</h1>}

            <div className="relative overflow-auto max-h-[60vh] lg:max-h-[75vh] lg:px-16">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
