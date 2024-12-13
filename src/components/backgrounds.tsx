export function Backgrounds() {
  const IS_1024 = document.documentElement.clientWidth >= 1024

  return (
    <div>
      <div className="absolute z-10 top-0 left-0 w-[1553px]">
        <img src="images/icons/bg-top.png" />
      </div>
      <div className="absolute z-10 bottom-0 right-0 w-[1600px]">
        <img src="images/icons/bg-bottom.png" />
      </div>

      {IS_1024 && (
        <div>
          <div className="absolute z-20 top-0 left-[2%] max-lg:hidden">
            <img src="images/icons/hanging-star.svg" />
          </div>
          <div className="absolute z-20 top-0 left-[6%] max-lg:hidden">
            <img src="images/icons/hanging-ball.svg" />
          </div>
          <div className="absolute z-20 top-0 right-[3.5%] max-lg:hidden">
            <img src="images/icons/hanging-deer.svg" />
          </div>
          <div className="absolute z-20 top-0 right-[9%] max-lg:hidden">
            <img src="images/icons/hanging-tree.svg" />
          </div>
          <div className="absolute z-20 bottom-[610px] left-[2.5%] w-[77px] max-lg:hidden">
            <img src="images/icons/snowflake-big.svg" />
          </div>
          <div className="absolute z-20 bottom-[390px] left-[6.6%] max-lg:hidden">
            <img src="images/icons/snowflake-big.svg" />
          </div>
        </div>
      )}
    </div>
  )
}
