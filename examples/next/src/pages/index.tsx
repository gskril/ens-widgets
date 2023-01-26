import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { Widget } from 'widget'

import { wagmiClientConfig } from '../providers'

export default function Home() {
  const { openConnectModal } = useConnectModal()

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  return (
    <main>
      <div className="wrapper">
        {isMounted && <ConnectButton chainStatus="name" showBalance={false} />}

        <Widget
          wagmiClientConfig={wagmiClientConfig}
          connectAction={openConnectModal}
          trackingCode="testtinngg"
        />
      </div>
    </main>
  )
}
