import useInterval from '@use-it/interval'
import React from 'react'
import { formatDate, formatTime } from '../../lib/utils/dateUtil'

/**
 * A simple clock to display date/time. It updates every 1000ms.
 */
const Clock = ({
  date: dateProp = Date.now(),
  interval = 1000,
  now: nowProp = Date.now(),
  onInterval = null,
  time: timeProp = Date.now()
}) => {
  const [date, setDate] = React.useState(dateProp)
  const [now, setNow] = React.useState(nowProp)
  const [time, setTime] = React.useState(timeProp)

  const handleInterval = () => {
    now && setNow(Date.now())
    date && setDate(Date.now())
    time && setTime(Date.now())
  }

  useInterval(onInterval || handleInterval, interval)

  return (
    <>
      {date && <div>{formatDate(date)}</div>}
      {time && <div>{formatTime(time)}</div>}
      <form>
        I am a clock
        <label>
          <input
            type='checkbox'
            onChange={() => setDate(!date && now)}
            checked={date}
          />
          Date
        </label>
        <label>
          <input
            type='checkbox'
            onChange={() => setTime(!time && now)}
            checked={time}
          />
          Time
        </label>
      </form>
    </>
  )
}

export default Clock
