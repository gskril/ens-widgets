import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { RegistrationWidget } from 'ens-widgets'
import Head from 'next/head'

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

          <RegistrationWidget connectAction={openConnectModal} />
        </div>
      </main>
    </>
  )
}
