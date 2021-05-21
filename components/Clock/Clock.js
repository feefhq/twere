import React from 'react'
import useInterval from '../../lib/useInterval'

/**
 * A simple clock to display date/time. It updates every 1000ms.
 *
 * ✅ Will often trigger: `Warning: Text content did not match...`
 */
const Clock = () => {
  const [date, setDate] = React.useState(Date.now())
  const [openDate, setOpenDate] = React.useState(true)
  const [openTime, setOpenTime] = React.useState(true)

  const formatTime = date => new Date(date).toJSON().slice(11, 19)
  const formatDate = date => new Date(date).toDateString()

  useInterval(() => setDate(Date.now()), 1000)

  return (
    <>
      {openDate && <div>{formatDate(date)}</div>}
      {openTime && <div>{formatTime(date)}</div>}
      <form>
        <label>
          <input
            type='checkbox'
            onChange={() => setOpenDate(!openDate)}
            checked={openDate}
          />
          Date
        </label>

        <label>
          <input
            type='checkbox'
            onChange={() => setOpenTime(!openTime)}
            checked={openTime}
          />
          Time
        </label>
      </form>
    </>
  )
}

export default Clock
