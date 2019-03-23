import { Application } from '../Application.mjs'
import { Component } from '../Component.mjs'

export class For extends Component {
  on () {
    this.paint()
  }

  get template () {
    const objs = Application.notes;
    return objs.reduce((iter = '', obj) => {iter = `<li>Something</li>`})
  }
}
