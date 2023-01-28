# ENS Registration Widget (In Progress)

This is a React component that allows you to register .eth names on the Ethereum Name Service (ENS).

![ens-widget](https://user-images.githubusercontent.com/35093316/212418070-f595cb64-260b-4069-b191-5e2553b8cd6a.jpg)

## Test locally

Clone this repo and install dependencies

```bash
git clone https://github.com/gskril/ens-widget.git
cd ens-widget
yarn install
```

Start the code bundler for the component and the example react app

```bash
yarn dev
```

Open [localhost:3000](http://localhost:3000/) in your browser to see the widget in action. Any changes to [packages/widget](packages/widget) or [examples/vite](examples/vite) will auto-reload the page.

## Usage

Required props:

- `connectAction`: a function that opens a wallet connect modal. Tested with Rainbowkit and ConnectKit.
- `wagmiClientConfig`: the object you used to configure wagmi in your app ([like this](https://github.com/gskril/web3-starter/blob/main/src/providers.ts#L19-L23))

Optional props:

- `name`: a preset name to register
- `shadowless`: if true, the widget will not have a shadow
- `theme`: easily choose between dark and light mode (defaults to light)
- `trackingCode`: a 4-16 character unique string that will be included in the registration event for on-chain analytics

```jsx
import { Widget } from 'ens-widget'
import { useConnectModal } from '@rainbow-me/rainbowkit'

const clientConfig = {
  connectors: /* ... */,
  provider: /* ... */,
}

const App = () => {
  const { openConnectModal } = useConnectModal()

  return (
    <Widget
      trackingCode="my-cool-app"
      connectAction={openConnectModal}
      wagmiClientConfig={clientConfig}
    />
  )
}
```
