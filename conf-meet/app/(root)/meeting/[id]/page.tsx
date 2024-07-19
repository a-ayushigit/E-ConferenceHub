import React from 'react'

const meetingPage = ({params : {id}}: {params:{id:string}}) => {
  return (
    <div>
      Meeting Page {id}
    </div>
  )
}

export default meetingPage
