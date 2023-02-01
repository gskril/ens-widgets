import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { Widget } from 'ens-widgets'

import './App.css'
import { wagmiClientConfig } from './providers'

export default function Home() {
  const { openConnectModal } = useConnectModal()
  return (
    <main>
      <div className="wrapper">
        <ConnectButton showBalance={false} />

        <Widget
          wagmiClientConfig={wagmiClientConfig}
          connectAction={openConnectModal}
          trackingCode="demo"
        />
      </div>
    </main>
  )
}
