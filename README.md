# ENS Widgets

[![npm](https://img.shields.io/npm/v/ens-widgets)](https://www.npmjs.com/package/ens-widgets)

A small, configurable React component for interacting with the [Ethereum Name Service](http://ens.domains/).

## Installation

Install the widgets library and its peer dependencies via `npm` or `yarn`.

```bash
yarn add ens-widgets ethers wagmi
```

```bash
npm install ens-widgets ethers wagmi
```

## Name Registration Widget

![ens-widget](https://user-images.githubusercontent.com/35093316/212418070-f595cb64-260b-4069-b191-5e2553b8cd6a.jpg)

This component assumes your app is already wrapped in [`<WagmiConfig>`](https://wagmi.sh/docs/WagmiConfig) and either a [RainbowKit](https://www.rainbowkit.com/docs/installation#wrap-providers) or [ConnectKit](https://docs.family.co/connectkit/api-reference#connectkitprovider) provider.

Required props:

- `connectAction`: a [RainbowKit](https://www.rainbowkit.com/docs/modal-hooks) or [ConnectKit](https://docs.family.co/connectkit/api-reference#usemodal-hook) function that opens a wallet connect modal

Optional props:

- `name`: a preset name to register
- `shadowless`: if true, the widget will not have a shadow
- `theme`: easily choose between dark and light mode (defaults to light)
- `trackingCode`: a 4-16 character unique string that will be included in the registration event for on-chain analytics

```jsx
import { RegistrationWidget } from 'ens-widgets'
import { useConnectModal } from '@rainbow-me/rainbowkit'

export default function Page() {
  const { openConnectModal } = useConnectModal()

  return <RegistrationWidget connectAction={openConnectModal} />
}
```

## Running examples

Clone this repo and install dependencies

```bash
git clone https://github.com/gskril/ens-widgets.git
cd ens-widgets
yarn install
```

Start the code bundler for the component and the example Vite app

```bash
yarn dev:vite # or dev:next for a Next.js example
# then in another terminal window:
yarn dev:widget
```

Any changes to [packages/widget](packages/widget) or [examples/vite](examples/vite) will auto-reload the page.
