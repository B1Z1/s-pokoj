const DISABLE_BUTTON_CLASS = 'm-Hero__seemore--disable'
const ACTIVE_POPUP_CLASS = 'm-Hero__popup--active'

export class Hero {
  constructor() {
    this.$Hero = document.querySelector('[data-js="Hero"]')
    this.$HeroSeeMore = document.querySelector('[data-hero-seemore]')
    this.$HeroPopup = document.querySelector('[data-hero-popup]')
    this.$HeroPopupClose = document.querySelector('[data-hero-close]')

    this.init()
  }

  init() {
    this.$HeroSeeMore.addEventListener('click', () => {
      this.$HeroSeeMore.classList.add(DISABLE_BUTTON_CLASS)
      this.$HeroPopup.classList.add(ACTIVE_POPUP_CLASS)
    })
    this.$HeroPopupClose.addEventListener('click', () => {
      this.$HeroSeeMore.classList.remove(DISABLE_BUTTON_CLASS)
      this.$HeroPopup.classList.remove(ACTIVE_POPUP_CLASS)
    })
  }
}
