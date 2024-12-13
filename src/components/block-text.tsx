import { useState } from 'react'
import { MultilineTextField } from '../ui/multiline-text-field'
import { Block } from './block'

export function BlockText({
  isGenerationError,
}: {
  isGenerationError: boolean
}) {
  const [isError, setIsError] = useState<boolean>(false)
  const [value, setValue] = useState('')

  const showError = (isGenerationError && value === '') || isError

  return (
    <Block info="Блок 2" title="Текст">
      <div className="text-info text-myPurple mb-[10px]">
        Максимальное кол-во символов - 220
      </div>
      <MultilineTextField
        error={showError && 'Заполните это поле'}
        textareaProps={{
          id: 'input-text',
          rows: 7,
          placeholder: 'Введите поздравление...',
          maxLength: 220,
          onInput: (e) => {
            const target = e.target as HTMLTextAreaElement
            setValue(target.value)
            setIsError(target.value.length === 0)
          },
        }}
      />
    </Block>
  )
}
