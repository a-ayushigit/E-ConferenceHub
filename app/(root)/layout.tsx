
import StreamVideoProvider from '@/providers/stream-client-provider'
import React, { ReactNode } from 'react'
const layout = ({children} : {children:ReactNode}) => {
  return (
    <div>
      <section>
        <StreamVideoProvider>
        {children}
        </StreamVideoProvider>
        </section>
    </div>
  )
}

export default layout
