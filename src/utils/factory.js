export default class Factory {
  constructor(){
    this.factoryArr = []
  }

  create(){
    if (this.factoryArr.length === 0) {
      return document.createElement('div')
    }
    return this.factoryArr.shift()
  }

  recover(div){
    return this.factoryArr.push(div)
  }

}