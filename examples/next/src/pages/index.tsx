import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { RegistrationWidget } from 'ens-widgets'
import Head from 'next/head'

import { wagmiClientConfig } from '../providers'

export default function Home() {
  const { openConnectModal } = useConnectModal()

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <div className="wrapper">
          <ConnectButton showBalance={false} />

          <RegistrationWidget
            wagmiClientConfig={wagmiClientConfig}
            connectAction={openConnectModal}
          />
        </div>
      </main>
    </>
  )
}
