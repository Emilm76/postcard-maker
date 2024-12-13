export interface PostcardsData {
  postcards: PostcardData[]
}

export interface PostcardData {
  id: number
  imgPath: string
  text: string
  style: string
  imgBase64Path: string
}

export interface Template {
  title: string
  text: string
  bgId: PostcardData['id'] | undefined
  logo: any
  tel: string
  site: string
  whatsapp: string
  telegram: string
}
