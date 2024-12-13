import { useState } from 'react'
import { TextField } from '../ui/text-filed'
import { Block } from './block'

export function BlockHeader({
  isGenerationError,
}: {
  isGenerationError: boolean
}) {
  const [isError, setIsError] = useState<boolean>(false)
  const [value, setValue] = useState('')

  const showError = (isGenerationError && value === '') || isError

  return (
    <Block info="Блок 1" title="Заголовок">
      <div className="text-info text-myPurple mb-[10px]">
        Максимальное кол-во символов - 25
      </div>
      <TextField
        error={showError && 'Заполните это поле'}
        inputProps={{
          id: 'input-title',
          type: 'text',
          placeholder: 'Введите заголовок поздравления...',
          maxLength: 25,
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
