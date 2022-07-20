import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { KycDaoProvider } from '../.';
import KycDaoExample from './KycDaoExample';

const App = () => {
  const nearNetworkEnv = 'testnet';

  return (
    <div>
      <KycDaoProvider networkId={nearNetworkEnv} config={{}}>
        <KycDaoExample />
      </KycDaoProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
