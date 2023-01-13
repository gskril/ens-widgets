# ENS Registration Widget (In Progress)

This is a React component that allows you to register .eth names on the Ethereum Name Service (ENS).

![ens-widget](https://user-images.githubusercontent.com/35093316/212418070-f595cb64-260b-4069-b191-5e2553b8cd6a.jpg)

## Usage

To test the component locally, run `yarn link` in the root directory of this project. Then, in the root directory of your project, run `yarn link ens-widget`.

Now you can import the component into your project and use it like so:

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
      connectAction={openConnectModal}
      wagmiClientConfig={clientConfig}
    />
  )
}
```

While `clientConfig` may look confusing, you already have it from when you configured wagmi in your app. Just export it from the file where you configured wagmi ([like this](https://github.com/gskril/web3-starter/blob/main/src/providers.ts#L19-L23)) and import it into the file where you're using the widget.

## Notes

- I followed [this guide](https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe) to set up the project
- I'm primarily testing the component with my [web3-starter repo](https://github.com/gskril/web3-starter)
