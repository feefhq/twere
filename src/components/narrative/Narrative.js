import React from 'react'
import styles from './Narrative.module.css'
import Narreme from './Narreme'

class Narrative extends React.Component {
  listItems () {
    const narremes = this.props.values || []
    return narremes.map((value) =>
      <Narreme key={value} value={value} />
    )
  }

  render () {
    return (
      <div role='list' className={`${styles.Narrative} ${styles[this.props.direction]}`}>
        {this.listItems()}
      </div>
    )
  }
}

export default Narrative
