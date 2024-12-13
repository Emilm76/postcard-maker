export function Header() {
  return (
    <header className="flex flex-col items-center gap-10 lg:flex-row lg:gap-24 lg:items-start bg-white rounded-myMd py-[60px] px-5 lg:px-[60px] ">
      <div className="lg:basis-[250px] shrink-0">
        <img src="images/logo-pixel.svg" className="no-drag" />
      </div>
      <div>
        <h1 className="text-myPurple mb-6 lg:mb-8">
          Приветствуем вас в нашем сервисе генерации новогодних открыток!
        </h1>
        <div>
          Просто введите необходимую информацию, и мы создадим
          для вас уникальную поздравительную открытку от имени вашей компании.
          Пусть ваши клиенты и партнёры ощутят новогоднее волшебство вместе
          с вами!
        </div>
      </div>
    </header>
  )
}
