import { useEffect, useState } from 'react'
import { Backgrounds } from './components/backgrounds'
import { BlockBackgrounds } from './components/block-backgrounds'
import { BlockContacts } from './components/block-contacts'
import { BlockLogo } from './components/block-logo'
import { BlockText } from './components/block-text'
import { BlockHeader } from './components/block-title'
import { Header } from './components/header'
import { ResultModal } from './components/result-modal'
import { DEFAULT_POSTCARD_DATA, DEFAULT_TEMPLATE } from './constants'
import { PostcardsData, Template } from './types'
import { Button } from './ui/button'

// TODO:
// - Отображение карточки на мобилке
// - Если в заголовке есть число "2025" - выделять его красным цветом
// - Убирать из номера телефона пробелы и тире для href
// - Добавлять https:// в для href ссылки на сайт (если его нет)
// - Автоматически ставить галочку в чекбоксе при вводе ссылки на тг/whatsapp
// - Валидация ссылок на тг и whatsapp
// - Переписать на redux
// - Заменить все any
// - Использовать глобальные пути через @

export function App() {
  const [postcardsData, setPostcardsData] = useState<PostcardsData>(
    DEFAULT_POSTCARD_DATA
  )
  const [template, setTemplate] = useState<Template>(DEFAULT_TEMPLATE)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isError, setIsError] = useState<boolean>(false)

  // Загружаем данные с сервера
  useEffect(() => {
    fetch('/postcards.json')
      .then((response) => response.json())
      .then((data) => {
        setPostcardsData(data)
      })
      .catch((error) => console.error('Ошибка загрузки postcards.json:', error))
  }, [])

  function handleOpenModal() {
    document.body.style.overflow = 'hidden'
    setIsModalOpen(true)
  }
  function handleCloseModal() {
    document.body.style.overflow = 'auto'
    setIsModalOpen(false)
  }

  function handleStartButtonClick() {
    const title: HTMLInputElement | null =
      document.querySelector('#input-title')
    const text: HTMLInputElement | null = document.querySelector('#input-text')
    const bgActive: HTMLInputElement | null = document.querySelector(
      '[data-bgid]._active'
    )
    const logo: HTMLInputElement | null = document.querySelector('#input-logo')
    const tel: HTMLInputElement | null = document.querySelector('#input-tel')
    const site: HTMLInputElement | null = document.querySelector('#input-site')
    const whatsappInput: HTMLInputElement | null =
      document.querySelector('#input-whatsapp')
    const telegramInput: HTMLInputElement | null =
      document.querySelector('#input-telegram')
    const whatsappCheckbox: HTMLInputElement | null =
      document.querySelector('#checkbox-whatsapp')
    const telegramCheckbox: HTMLInputElement | null =
      document.querySelector('#checkbox-telegram')

    const newTemplate = {
      title: title?.value || '',
      text: text?.value || '',
      bgId: bgActive?.dataset.bgid?.length && +bgActive.dataset.bgid,
      logo: logo?.files?.[0],
      tel: tel?.value || '',
      site: site?.value || '',
      whatsapp: (whatsappCheckbox?.checked && whatsappInput?.value) || '',
      telegram: (telegramCheckbox?.checked && telegramInput?.value) || '',
    }

    if (
      newTemplate.title.length &&
      newTemplate.text.length &&
      newTemplate.bgId
    ) {
      // console.log(newTemplate)
      setIsError(false)
      setTemplate(newTemplate)

      handleOpenModal()
    } else {
      setIsError(true)
    }
  }

  return (
    <>
      <div className="relative z-30 max-w-[1200px] my-0 mx-auto">
        <Header />

        <div className="flex flex-col gap-[10px] my-[30px]">
          <BlockHeader isGenerationError={isError} />
          <BlockText isGenerationError={isError} />
          <BlockBackgrounds
            postcards={postcardsData.postcards}
            isGenerationError={isError}
          />
          <BlockLogo />
          <BlockContacts />
        </div>

        <Button
          type="button"
          className="w-full"
          variant="outlined"
          onClick={handleStartButtonClick}
        >
          Сгенерировать
        </Button>
        {isError && (
          <div className="mt-4 text-info text-rose-400">
            Заполните необходимые поля
          </div>
        )}

        <ResultModal
          template={template}
          postcardsData={postcardsData}
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <Backgrounds />
    </>
  )
}
