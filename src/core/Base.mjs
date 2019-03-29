export class Base {
  constructor () {
    this.method = ''
  }

  push () {
    this.method()
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
    return this.put()
  }

  static put () {}

  static get POST () {
    return this.post()
  }

  static post () {}
}
