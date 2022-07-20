# kycdao-react-sdk

A wrapper around [kycdao-js-sdk](https://github.com/kycdao/kycdao-js-sdk) for React and Next.js

## Installation

> The package had not been published yet

```bash
npm install https://github.com/sandoche/kycdao-react-sdk
```

## How to use it

1. Set up the `KycDaoProvider` component

```jsx
import { KycDaoProvider } from 'kycdao-react-sdk';

const App = () => {
  const nearNetworkEnv = 'testnet';

  // you can override the default settings here
  const config = {};

  return (
    <div>
      <KycDaoProvider networkId={nearNetworkEnv} config={config}>
        <KycDaoComponent />
      </KycDaoProvider>
    </div>
  );
};
```

2. Use the `useKycDao()` hook to access the `kycDao` instance

```jsx
import { useKycDao } from 'kycdao-react-sdk';

const KycDaoComponent = () => {
  const { kycDao } = useKycDao();

  // use the kycDao instance

  return <div>{/* Your view here */}</div>;
};
```

### Example

Check out the [KycDaoExample](example/KycDaoExample.tsx).

## Documentation

- [KycDao API Reference](https://kycdao.github.io/kycdao-js-sdk/docs/api-reference/).
- [TSdx](https://tsdx.io/)
