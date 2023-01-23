# ENS Registration Widget (In Progress)

This is a React component that allows you to register .eth names on the Ethereum Name Service (ENS).

![ens-widget](https://user-images.githubusercontent.com/35093316/212418070-f595cb64-260b-4069-b191-5e2553b8cd6a.jpg)

## Test locally

Clone this repo and install dependencies

```bash
git clone https://github.com/gskril/ens-widget.git
cd ens-widget
yarn
```

Build the component and make it available to other projects on your machine by creating a symlink to it

```bash
yarn run rollup
yarn link
```

In the root directory of your project where you want to use the widget, link the component

```bash
yarn link ens-widget
```

Make sure you have the peer dependencies installed in your project (feel free to test with [web3-starter](https://github.com/gskril/web3-starter) which already has these)

```bash
yarn add ethers styled-components wagmi

# Then you can use the wallet connect library of your choice. I use rainbowkit
yarn add @rainbow-me/rainbowkit
```

## Usage

Required props:

- `connectAction`: a function that opens a wallet connect modal
- `wagmiClientConfig`: the object you used to configure wagmi in your app ([like this](https://github.com/gskril/web3-starter/blob/main/src/providers.ts#L19-L23))

Optional props:

- `name`: a preset name to register
- `shadowless`: if true, the widget will not have a shadow
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
