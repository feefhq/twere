export class Base {
  constructor () {
    this.method = ''
  }

  push (params) {
    this.method(params)
  }

  static get GET () {
    const obj = Object.create(this.prototype)
    obj.method = obj.get
    return obj
  }

  static get () {}

  static get DELETE () {
    const obj = Object.create(this.prototype)
    obj.method = obj.delete
    return obj
  }

  static delete () {}

  static get PUT () {
    const obj = Object.create(this.prototype)
    obj.method = obj.put
    return obj
  }

  static put () {}

  static get POST () {
    const obj = Object.create(this.prototype)
    obj.method = obj.post
    return obj
  }

  static post () {}
}
