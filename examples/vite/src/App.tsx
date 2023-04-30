import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { RegistrationWidget } from 'ens-widgets'

import './App.css'

export default function Home() {
  const { openConnectModal } = useConnectModal()
  return (
    <main>
      <div className="wrapper">
        <ConnectButton showBalance={false} />

        <RegistrationWidget
          connectAction={openConnectModal}
          trackingCode="demo.eth"
        />
      </div>
    </main>
  )
}
