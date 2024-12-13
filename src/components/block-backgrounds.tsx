// import { TEMPLATES } from '../constants'
import clsx from 'clsx'
import { useState } from 'react'
import { PostcardData } from 'src/types'
import { RadioInput } from '../ui/radio-input'
import { Block } from './block'

export function BlockBackgrounds({
  postcards,
  isGenerationError,
}: {
  postcards: PostcardData[]
  isGenerationError: boolean
}) {
  const [activeCardId, setActiveCardId] = useState<PostcardData['id'] | null>(
    null
  )

  return (
    <Block
      info="Блок 3"
      title="Фон"
      bodyClassName="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
    >
      {postcards.map((card: PostcardData) => {
        return (
          <label
            data-bgid={card.id}
            className={clsx(
              'card-label',
              card.id === activeCardId && '_active'
            )}
            onClick={() => {
              setActiveCardId(card.id)
            }}
            key={card.id}
          >
            <div className="card-label__image rounded-mySm overflow-hidden mb-5 shadow-none transition-shadow">
              <img src={card.imgPath} className="no-drag" />
            </div>
            <RadioInput name="templates" label={card.text} />
          </label>
        )
      })}

      {isGenerationError && !activeCardId && (
        <div className="mt-4 text-info text-rose-400">Выберите фон</div>
      )}
    </Block>
  )
}
