import { jsPDF } from 'jspdf'
import { useEffect, useRef, useState } from 'react'
import { PostcardData, PostcardsData, Template } from 'src/types'
import { DownloadButton } from '../ui/download-button'
import { LoadingIcon } from '../ui/icons/loading'
import { Modal } from '../ui/modal'

export function ResultModal({
  template,
  postcardsData,
  isOpen,
  handleCloseModal,
}: {
  template: Template
  postcardsData: PostcardsData
  isOpen: boolean
  handleCloseModal: () => void
}) {
  const [backgroundBase64, setBackgroundBase64] = useState('')
  const [currentPostcard, setCurrentPostcard] = useState<PostcardData | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(true)
  const [fonts, setFonts] = useState({ titleFont: '', textFont: '' })
  const [social, setSocial] = useState({ telegramImg: '', whatsappImg: '' })
  const [logoContent, setLogoContent] = useState<
    [string, number, number] | null
  >(null)
  const [logoSrc, setLogoSrc] = useState<[any, number, number] | null>(null)
  const [formatTel, setFormatTel] = useState<string | null>(null)
  const [currentPositions, setCurrentPositions] = useState<any>(null)
  const [currentPositionsPDF, setCurrentPositionsPDF] = useState<any>(null)
  const [isError, setIsError] = useState<boolean>(false)
  const cardRef = useRef(null)

  const positions: any = {
    green: {
      logo: { top: '70px', left: '50%', color: '#fff' },
      title: { top: '420px', left: '50%', color: '#fff' },
      text: { top: '560px', left: '50%', color: '#fff' },
      contacts: { left: '40px', bottom: '40px', color: '#fff' },
      social: { right: '40px', bottom: '40px' },
    },
    purple: {
      logo: { top: '540px', left: '50%', color: '#FEDFBF' },
      title: { top: '48px', left: '50%', color: '#FEDFBF' },
      text: { top: '280px', left: '50%', color: '#FEDFBF' },
      contacts: { left: '60px', bottom: '35px', color: '#FEDFBF' },
      social: { right: '60px', bottom: '35px' },
    },
    blue: {
      logo: { top: '25px', left: '50%', color: '#051247' },
      title: { top: '415px', left: '50%', color: '#10638B' },
      text: { top: '585px', left: '50%', color: '#fff' },
      contacts: { left: '40px', bottom: '24px', color: '#fff' },
      social: { right: '40px', bottom: '24px' },
    },
    beige: {
      logo: { top: '50px', left: '50%', color: '#F1EFC4' },
      title: { top: '100px', left: '50%', color: '#F1EFC4' },
      text: { top: '247px', left: '50%', color: '#F1EFC4' },
      contacts: { left: '40px', bottom: '33px', color: '#F1EFC4' },
      social: { right: '40px', bottom: '33px' },
    },
    red: {
      logo: { bottom: '155px', left: '50%', color: '#fff' },
      title: { top: '50px', left: '50%', color: '#fff' },
      text: { top: '200px', left: '50%', color: '#fff' },
      contacts: { left: '40px', bottom: '33px', color: '#fff' },
      social: { right: '40px', bottom: '33px' },
    },
  }
  const positionsPDF: any = {
    green: {
      logo: { y: 70, x: 0, color: '#fff' },
      title: { y: 470, x: 300, color: '#fff' }, // y + 50
      text: { y: 580, x: 300, color: '#fff' }, // y + 20
      contacts: { x: 40, y: 775, color: '#fff' },
      social: { x: 450, y: 755 },
    },
    purple: {
      logo: { y: 505, x: 0, color: '#FEDFBF' },
      title: { y: 98, x: 300, color: '#FEDFBF' },
      text: { y: 300, x: 300, color: '#FEDFBF' },
      contacts: { x: 60, y: 775, color: '#FEDFBF' },
      social: { x: 434, y: 760 },
    },
    blue: {
      logo: { y: 28, x: 0, color: '#051247' },
      title: { y: 475, x: 300, color: '#10638B' },
      text: { y: 615, x: 300, color: '#fff' },
      contacts: { x: 40, y: 785, color: '#fff' },
      social: { x: 450, y: 770 },
    },
    beige: {
      logo: { y: 50, x: 0, color: '#F1EFC4' },
      title: { y: 150, x: 300, color: '#F1EFC4' },
      text: { y: 260, x: 300, color: '#F1EFC4' },
      contacts: { x: 40, y: 775, color: '#F1EFC4' },
      social: { x: 450, y: 760 },
    },
    red: {
      logo: { y: 670, x: 0, color: '#fff' },
      title: { y: 100, x: 300, color: '#fff' },
      text: { y: 215, x: 300, color: '#fff' },
      contacts: { x: 35, y: 780, color: '#fff' },
      social: { x: 467, y: 765 },
    },
  }

  function formatPhoneNumber(phone: string) {
    return phone.replace(/[^\d+]/g, '')
  }
  useEffect(() => {
    setFormatTel(formatPhoneNumber(template.tel))
  })

  function isPopularBrowser() {
    const userAgent = navigator.userAgent
    console.log(userAgent)

    return /Chrome|Safari|Firefox|Edg/.test(userAgent)
  }

  useEffect(() => {
    async function loadFonts() {
      try {
        const [titleFont, textFont] = await Promise.all([
          fetch('fonts/AttackType-Regular-base64.txt').then((res) =>
            res.text()
          ),
          fetch('fonts/SuisseIntl-Light-base64.txt').then((res) => res.text()),
        ])
        const [telegramImg, whatsappImg] = await Promise.all([
          fetch('images/icons/telegram-white-black-base64.txt').then((res) =>
            res.text()
          ),
          fetch('images/icons/whatsapp-white-black-base64.txt').then((res) =>
            res.text()
          ),
        ])
        setFonts({ titleFont, textFont })
        setSocial({ telegramImg, whatsappImg })
      } catch (error) {
        console.error('Error loading fonts:', error)
      }
    }
    loadFonts()
  }, [])

  useEffect(() => {
    async function loadPostcardData() {
      if (!isOpen) return

      const currPostcard = postcardsData.postcards.find(
        (card) => card.id === template.bgId
      )

      if (!currPostcard) {
        console.error('Current postcard is undefined')
        return
      }

      setCurrentPostcard(currPostcard)
      try {
        const imgData = await fetch(currPostcard.imgBase64Path).then((res) =>
          res.text()
        )
        setBackgroundBase64(imgData)
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error loading postcard background:', error)
      }
    }

    loadPostcardData()
  }, [isOpen, postcardsData, template.bgId])

  const generatePdf = () => {
    const doc = new jsPDF({ unit: 'px', format: [595, 842] })

    if (fonts.titleFont) {
      doc.addFileToVFS('AttackType-Regular.ttf', fonts.titleFont)
      doc.addFont('AttackType-Regular.ttf', 'AttackType', 'normal')
    }

    if (fonts.textFont) {
      doc.addFileToVFS('SuisseIntl-Light.ttf', fonts.textFont)
      doc.addFont('SuisseIntl-Light.ttf', 'SuisseIntl', 'normal')
    }

    if (backgroundBase64) {
      doc.addImage(backgroundBase64, 'png', 0, 0, 595, 842)
    }

    doc.setFont('AttackType')
    doc.setFontSize(62)
    doc.setTextColor(currentPositionsPDF?.title.color)
    doc.text(
      template.title,
      currentPositionsPDF.title.x,
      currentPositionsPDF.title.y,
      { maxWidth: 400, lineHeightFactor: 1.2, align: 'center' }
    )

    doc.setFont('SuisseIntl')
    doc.setFontSize(20)
    doc.setTextColor(currentPositionsPDF.text.color)
    doc.text(
      template.text,
      currentPositionsPDF.text.x,
      currentPositionsPDF.text.y,
      { maxWidth: 410, lineHeightFactor: 1.16, align: 'center' }
    )

    doc.setFontSize(22)

    // Контакты
    let contactsLinkY = currentPositionsPDF.contacts.y
    const contactsLinkX = currentPositionsPDF.contacts.x
    if (template.site !== '') {
      doc.textWithLink(template.site, contactsLinkX, contactsLinkY + 27, {
        url: template.site,
      })
    } else contactsLinkY += 27
    if (template.tel !== '') {
      doc.text(template.tel, contactsLinkX, contactsLinkY)
    }

    // Соц.сети
    let socialLinkX = currentPositionsPDF.social.x
    const socialLinkY = currentPositionsPDF.social.y
    if (template.whatsapp !== '') {
      doc.addImage(
        social.whatsappImg,
        'png',
        socialLinkX + 58,
        socialLinkY,
        48,
        48
      )
      doc.link(socialLinkX + 58, socialLinkY, 48, 48, {
        url: template.whatsapp,
      })
    } else socialLinkX += 58
    if (template.telegram !== '') {
      doc.addImage(social.telegramImg, 'png', socialLinkX, socialLinkY, 48, 48)
      doc.link(socialLinkX, socialLinkY, 48, 48, {
        url: template.telegram,
      })
    }

    // Логотип
    if (logoContent) {
      var svg = document.querySelector('#logo-svg')?.innerHTML
      if (svg) svg = svg.replace(/\r?\n|\r/g, '').trim()
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')

      context?.clearRect(0, 0, canvas.width, canvas.height)
      // @ts-ignore
      canvg(canvas, svg)

      var imgData = canvas.toDataURL('image/png')

      doc.addImage(
        imgData,
        'PNG',
        297 - logoContent[1] / 2,
        currentPositionsPDF.logo.y,
        logoContent[1],
        logoContent[2]
      )
    }
    if (logoSrc) {
      doc.addImage(
        logoSrc[0],
        'PNG',
        297 - logoSrc[1] / 2,
        currentPositionsPDF.logo.y,
        logoSrc[1],
        17
      )
    }

    if (isPopularBrowser()) {
      doc.save('Новогодняя открытка от команды Pixel².pdf')
    } else {
      doc.output('blob')
      const blob = doc.output('blob')
      const url = URL.createObjectURL(blob)
      window.open(url)

      setIsError(true)
    }
  }

  useEffect(() => {
    if (!currentPostcard) {
      console.error('currentPostcard is undefined')
      return
    }
    setCurrentPositions(positions[currentPostcard.style])
    setCurrentPositionsPDF(positionsPDF[currentPostcard.style])
  }, [currentPostcard])

  // Редактируем svg логотип (изменяем цвет и размер)
  let logo = template.logo
  useEffect(() => {
    if (!currentPostcard || !logo) return

    if (logo.type === 'image/svg+xml') {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.result) {
          const svgContent = reader.result as string
          const widthMatch = svgContent.match(/width="([^"]+)"/)?.[1] as string
          const heightMatch = svgContent.match(
            /height="([^"]+)"/
          )?.[1] as string
          const sizeRatio = 17 / +heightMatch
          const newWidth = +widthMatch * sizeRatio

          const updatedSvg1 = svgContent.replace(
            /fill=".*?"/g,
            `fill="${currentPositions.logo.color}"`
          )
          const updatedSvg2 = updatedSvg1.replace(
            /stroke=".*?"/g,
            `stroke="${currentPositions.logo.color}"`
          )
          const updatedSvg3 = updatedSvg2.replace(
            /height=".*?"/g,
            'height="17"'
          )
          const updatedSvg4 = updatedSvg3.replace(
            /width=".*?"/g,
            `width="${newWidth}"`
          )

          const viewBox = updatedSvg4.indexOf('viewBox')
          let updatedSvg5 =
            viewBox === -1
              ? updatedSvg4.replace(
                  /width=".*?"/g,
                  `width="${newWidth}" viewBox="0 0 ${widthMatch} ${heightMatch}"`
                )
              : updatedSvg4

          setLogoContent([updatedSvg5, newWidth, 17])
        }
      }

      reader.readAsText(logo)
    } else setLogoContent(null)

    if (logo.type === 'image/png') {
      // Переводим в Base64
      const reader = new FileReader()
      reader.onload = () => {
        // Получаем размеры
        const img = new Image()
        img.onload = () => {
          console.log(`Width: ${img.width}, Height: ${img.height}`)

          const sizeRatio = 17 / img.height
          const newWidth = img.width * sizeRatio
          console.log(reader.result)
          setLogoSrc([reader.result, newWidth, 17])
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(logo)
    } else setLogoSrc(null)
  }, [isOpen, template.logo, currentPositions])

  if (!currentPostcard) return null

  return (
    <Modal
      title={isLoading ? 'Подождите, открытка готовится' : 'Предпросмотр'}
      isOpen={isOpen}
      closeCallback={() => {
        handleCloseModal()
        setTimeout(() => {
          setIsLoading(true)
        }, 300)
      }}
    >
      {isLoading ? (
        <LoadingIcon className="w-[100px] h-[100px] mx-auto mt-5 text-myPurple lg:mt-10" />
      ) : (
        <div className="inline-block w-full">
          <div className="card-preview-parent">
            <div
              className="card-preview origin-top-left w-[595px] mx-auto rounded-mySm overflow-hidden mb-10"
              ref={cardRef}
            >
              <div className="relative">
                <img src={currentPostcard.imgPath} alt="Postcard background" />

                <div
                  style={currentPositions.logo}
                  className="absolute -translate-x-1/2 h-[17px]"
                >
                  {logoContent && (
                    <div
                      id="logo-svg"
                      dangerouslySetInnerHTML={{ __html: logoContent[0] }}
                      className="max-h-full"
                    />
                  )}
                  {logoSrc && <img className="max-h-full" src={logoSrc[0]} />}
                </div>

                <div
                  style={currentPositions.title}
                  className="h-postcard absolute leading-[1.2] -translate-x-1/2 text-center w-[240px] lg:w-[400px] whitespace-pre-wrap"
                >
                  {template.title}
                </div>

                <div
                  style={currentPositions.text}
                  className="text-second absolute leading-[1.15] -translate-x-1/2 text-center w-[240px] lg:w-[435px] whitespace-pre-wrap"
                >
                  {template.text}
                </div>

                <div
                  style={currentPositions.contacts}
                  className="flex flex-col gap-[5px] absolute text-second"
                >
                  {template.tel && (
                    <a
                      className="text-[18px] leading-[1.16]"
                      href={`tel:${formatTel}`}
                    >
                      {template.tel}
                    </a>
                  )}
                  {template.site && (
                    <a
                      className="text-[18px] leading-[1.16]"
                      href={template.site}
                    >
                      {template.site}
                    </a>
                  )}
                </div>

                <div
                  style={currentPositions.social}
                  className="flex gap-[10px] absolute"
                >
                  {template.telegram && (
                    <a href={template.telegram}>
                      <img src="images/icons/telegram-white-black.png" />
                    </a>
                  )}
                  {template.whatsapp && (
                    <a href={template.whatsapp}>
                      <img src="images/icons/whatsapp-white-black.png" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DownloadButton onClick={generatePdf} />
          {isError && (
            <div className="mt-4 text-info text-rose-400">
              Если скачивание не началось - попробуйте открыть сайт в другом
              браузере
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
