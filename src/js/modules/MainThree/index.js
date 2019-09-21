import * as THREE from 'three'
import ScrollMagic from 'scrollmagic'
import { TimelineMax } from 'gsap'
import 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'

const BREAKPOINT = 1280
export class MainThree {
  constructor() {
    this.$MainThree = document.querySelector('[data-js="MainThree"]')
    this.$MainThreeCanvas = document.querySelector('[data-mainthree-canvas]')
    this.$MainThreeVideo = document.querySelector('[data-mainthree-video]')

    this.$MainThreeVideo.play()

    this.options = {
      color: 0x1a1c1e,
    }

    //THREE Options
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.renderer = new THREE.WebGLRenderer({ canvas: this.$MainThreeCanvas })
    //Three Options - End

    //Elements
    this.monitor = {}
    this.smallBlock = {}
    this.blockWithLights = {}
    this.video = {}
    this.frontLight = {}

    this.init()
  }

  /**
   * @function init
   */
  init() {
    this.scene.background = new THREE.Color('white')
    this.camera.position.z = window.innerWidth < BREAKPOINT ? 3 : 1.5

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.changeCameraRotation()

    //MainBox
    this.initMonitor()
    this.initSmallBlock()
    this.initBlockWithLights()
    this.initVideo()
    this.initFrontLight()

    //Add to scene function
    this.addFiguresToScene()

    //Animate
    this.animate()

    //On Scroll
    this.onScrollCamera()
  }

  /**
   * @function onScrollCamera
   */
  onScrollCamera() {
    const controller = new ScrollMagic.Controller(),
      monitorScene = new ScrollMagic.Scene({
        duration: window.innerHeight * 2,
        tweenChanges: true,
      })
        .setTween(this.camera.rotation, { x: -2 })
        .addTo(controller)
  }

  /**
   * @function initFrontLight
   */
  initFrontLight() {
    const color = 0xffffff
    const intensity = 1
    this.frontLight = new THREE.DirectionalLight(color, intensity)
    this.frontLight.position.set(0, 2, 3)
    this.frontLight.target.position.set(0, 1, 0)
  }

  /**
   * @function initBlockWithLights
   */
  initBlockWithLights() {
    this.blockWithLights.geometry = new THREE.BoxGeometry(1.25, 2, 0.2)
    this.blockWithLights.material = new THREE.MeshPhongMaterial({
      color: this.options.color,
    })
    this.blockWithLights.cube = new THREE.Mesh(
      this.blockWithLights.geometry,
      this.blockWithLights.material
    )

    this.blockWithLights.cube.castShadow = true
    this.blockWithLights.cube.position.y = 1.1
    this.blockWithLights.cube.rotation.x = 0.2
  }

  /**
   * @function initSmallBlock
   */
  initSmallBlock() {
    this.smallBlock.geometry = new THREE.BoxGeometry(1.2, 0.5, 0.2)
    this.smallBlock.material = new THREE.MeshPhongMaterial({
      color: this.options.color,
    })
    this.smallBlock.cube = new THREE.Mesh(
      this.smallBlock.geometry,
      this.smallBlock.material
    )
    this.smallBlock.cube.castShadow = true
    this.smallBlock.cube.position.y = 0.6
  }

  /**
   * @function initMainBox
   */
  initMonitor() {
    this.monitor.geometry = new THREE.BoxGeometry(2, 1, 0.2)
    this.monitor.material = new THREE.MeshPhongMaterial({
      color: this.options.color,
    })
    this.monitor.cube = new THREE.Mesh(
      this.monitor.geometry,
      this.monitor.material
    )
    this.monitor.cube.castShadow = true
  }

  /**
   * @function initVideo
   */
  initVideo() {
    this.video.texture = new THREE.VideoTexture(this.$MainThreeVideo)
    this.video.geometry = new THREE.BoxGeometry(1.8, 0.9, 0.2)
    this.video.material = new THREE.MeshPhongMaterial({
      map: this.video.texture,
    })
    this.video.cube = new THREE.Mesh(this.video.geometry, this.video.material)
    this.video.cube.position.z = 0.1
  }

  /**
   * @function addFiguresToScene
   * @param {Object} mainBox
   */
  addFiguresToScene() {
    this.scene.add(this.monitor.cube)
    this.scene.add(this.smallBlock.cube)
    this.scene.add(this.blockWithLights.cube)
    this.scene.add(this.video.cube)
    this.scene.add(this.frontLight)
    this.scene.add(this.frontLight.target)
  }

  /**
   * @function resizeRenderSize
   * @returns {Boolean}
   */
  resizeRenderSize() {
    let width = window.innerWidth,
      height = window.innerHeight,
      needResize =
        this.renderer.domElement.width !== width ||
        this.renderer.domElement.height !== height
    if (needResize) {
      this.renderer.setSize(width, height)
    }

    return needResize
  }

  /**
   * @function animate
   */
  animate() {
    requestAnimationFrame(() => {
      this.animate()
    })

    if (this.resizeRenderSize()) {
      let aspect =
        this.renderer.domElement.width / this.renderer.domElement.height
      this.camera.aspect = aspect
      this.camera.updateProjectionMatrix()
    }

    this.renderer.render(this.scene, this.camera)
  }

  /**
   * @function changeCameraRotation
   */
  changeCameraRotation() {
    window.addEventListener('mousemove', ev => {
      let { clientX, clientY } = ev
      if (window.scrollY === 0) {
        this.camera.position.x =
          ((clientX - window.innerWidth / 2) * 0.005) / 50
        this.camera.position.y =
          ((clientY - window.innerHeight / 2) * 0.3 * 0.005) / 10
        this.camera.lookAt(this.monitor.cube.position)
      }
    })
  }
}
