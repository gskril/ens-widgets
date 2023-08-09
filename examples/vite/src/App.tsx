import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { RegistrationWidget } from 'ens-widgets'
import { useState } from 'react'

import './App.css'

type WidgetStatus = 'idle' | 'active' | 'error' | 'success'

export default function Home() {
  const { openConnectModal } = useConnectModal()
  const [status, setStatus] = useState<WidgetStatus>('idle')

  const handleStatusUpdate = (newStatus: WidgetStatus) => {
    setStatus(newStatus)
  }

  return (
    <main>
      <div />

      <div className="wrapper">
        <ConnectButton showBalance={false} />

        <p>status: {status}</p>

        <RegistrationWidget
          connectAction={openConnectModal}
          onStatusUpdate={handleStatusUpdate}
          trackingCode="demo.eth"
        />
      </div>

      <a href="https://github.com/gskril/ens-widgets">GitHub Repo</a>
    </main>
  )
}
