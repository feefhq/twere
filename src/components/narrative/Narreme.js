import React from 'react'
import Markdown from './../../utils/text/Markdown'
import styles from './Narreme.module.css'

class Narreme extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: props.value }
  }

  createMarkup () {
    return { __html: Markdown.toHTML(this.props.value) }
  }

  render () {
    return (
      <div role='listitem' className={styles.Narreme} dangerouslySetInnerHTML={this.createMarkup()} />
    )
  }
}

export default Narreme
