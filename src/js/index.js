import '../sass/style.scss'

/* Modules */
import { MainThree } from './modules/MainThree'
import { Hero } from './modules/Hero'

window.addEventListener('load', () => {
  //Preloader remove
  let $Preloader = document.querySelector('[data-js="Preloader"]')
  setTimeout(() => {
    $Preloader.classList.add('m-Preloader--disabled')
    setTimeout(() => {
      $Preloader.remove()
    }, 300)
  }, 1000)

  new MainThree()
  new Hero()
})
