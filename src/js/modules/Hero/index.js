export class Hero {
  constructor() {
    this.$HeroSeeMore = document.querySelector('[data-hero-seemore]')

    this.init()
  }

  init() {
    this.$HeroSeeMore.addEventListener('click', () => {
      window.scrollTo({
        top: window.innerHeight - 64,
        behavior: 'smooth',
      })
    })
  }
}
