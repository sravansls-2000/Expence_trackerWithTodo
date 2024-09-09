import { parseISO, formatDistanceToNow } from 'date-fns'

import React from 'react'

const TimeAgo = ({ timeStamp }) => {
    let timeAgo=""
    if (timeStamp) {
        const date = parseISO(timeStamp)
        const timeWhen = formatDistanceToNow(date)
        timeAgo=`${timeWhen} Ago`
    }
  return (
      <div className='italic'>{timeAgo}</div>
  )
}

export default TimeAgo