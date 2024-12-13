import { ChangeEvent, useState } from 'react'
import { CheckboxInput } from '../ui/checkbox'
import { TextField } from '../ui/text-filed'
import { Block } from './block'

export function BlockContacts() {
  const [isWhatsapp, setIsWhatsapp] = useState<boolean>(false)
  const [isTelegram, setIsTelegram] = useState<boolean>(false)

  return (
    <Block info="Блок 5" title="Контакты">
      <TextField
        className="mb-5"
        label="Номер телефона"
        inputProps={{
          id: 'input-tel',
          type: 'tel',
          placeholder: '+7 (987) 578-52-87',
          maxLength: 18,
        }}
      />
      <TextField
        className="mb-5"
        label="Ссылка на сайт"
        inputProps={{
          id: 'input-site',
          type: 'text',
          placeholder: 'https://www.vashsite.ru/',
        }}
      />
      <div className="mb-[10px]">Мессенджеры</div>
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:gap-4 sm:mb-[10px]">
        <CheckboxInput
          className="sm:basis-[130px] flex-shrink-0"
          label="WhatsApp"
          inputProps={{
            id: 'checkbox-whatsapp',
            checked: isWhatsapp,
            onChange: () => {
              setIsWhatsapp((lastState) => !lastState)
            },
          }}
        />
        <TextField
          className="flex-grow"
          inputProps={{
            id: 'input-whatsapp',
            type: 'text',
            placeholder: 'Добавьте ссылку...',
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              setIsWhatsapp(event.target.value.length !== 0)
            },
          }}
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        <CheckboxInput
          className="sm:basis-[130px] flex-shrink-0"
          label="Telegram"
          inputProps={{
            id: 'checkbox-telegram',
            checked: isTelegram,
            onChange: () => {
              setIsTelegram((lastState) => !lastState)
            },
          }}
        />
        <TextField
          className="flex-grow"
          inputProps={{
            id: 'input-telegram',
            type: 'text',
            placeholder: 'Добавьте ссылку...',
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              setIsTelegram(event.target.value.length !== 0)
            },
          }}
        />
      </div>
    </Block>
  )
}
