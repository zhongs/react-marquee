export default class ScrollError extends Error{
  constructor(message){
    super()
    this.name = 'scroll error'
    this.message = message
    this.stack = (new Error()).stack
  }
} 