/**
 * Main controller. Still just a proof-of-concept.
 */
import Controller from '../core/Controller'
import Note from '../models/Note'
import { main, listItem } from '../views/main'

export default class MainController extends Controller {
  /**
   * Doesn't do anything yet
   */
  list () {
    Note.getAll().then((result) => {
      this.build(result)
      return this
    })
  }

  /**
   * This is just a proof-of-concept
   */
  new () {
    const note = new Note()
    note.content = 'Something different'
    note.save()
    return this
  }

  /**
   * This is a rudimentary attempt at creating a builder. It's trying to realise
   * a concept of component composition.
   */
  build (result) {
    const items = []
    result.forEach((item) => {
      items.push(listItem(`${item.createdAt} : ${item.content}`))
    })
    const container = main('Bar', items)
    this.template = container
    this.render()
  }
}
