import { raf, Factory, isString, ScrollError, getStyle } from './utils'

export default class Scroll {
  constructor(config = {}) {
    this.defalut = {
      box: '',                         // scroll container required
      globalStyle: '',                   // set scroll data global style
      direction: 'left',               // scroll direction
      data: [],                        // scroll data required
    }
    this._init(config)
  }

  _init(config) {

    this.config = Object.assign(this.defalut, config)
    const { box } = this.config

    if (box) {
      this.container = isString(box) ? document.getElementById(box) : box
    } else {
      throw new ScrollError('be sure to pass in box')
    }

    if (!window.requestAnimationFrame) { raf() }

    this.factory = new Factory()
  }

  start() {
    let { data } = this.config
    const itemData = data.shift()
    const style = this.getScrollStyle(itemData)
    const scrollItem = this.factory.create()
    
    scrollItem.setAttribute('class', style)
    scrollItem.innerHTML = itemData.txt


    this.container.appendChild(scrollItem)

    const transform = getStyle(scrollItem, 'transform')
    console.log('transform', transform)
  }

  pause() {

  }

  getScrollStyle(itemData = {}){
    const { globalStyle } = this.config || ''
    const { itemStyle } = itemData || ''
    return itemStyle || globalStyle
  }
}