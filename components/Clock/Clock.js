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
  onInterval,
  time: timeProp = Date.now(),
  toggles
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
    <div>
      {time && (
        <time dateTime={formatTime(time)} className='text-xl'>
          {formatTime(time)}
        </time>
      )}
      {date && (
        <time dateTime={formatDate(date)} className='mx-2 text-xs'>
          {formatDate(date)}
        </time>
      )}

      {toggles && (
        <form>
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
      )}
    </div>
  )
}

export default Clock
