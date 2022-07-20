import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// This library is not required but used to make it simpler
import { KycDaoProvider } from '../.';
import KycDaoExample from './KycDaoExample';

const App = () => {
  const [queryClient] = React.useState(() => new QueryClient()); // This library is not required but used to make it simpler
  const nearNetworkEnv = 'testnet';

  return (
    <div>
      {/* QueryClientProvider is not required but used to make it simpler */}
      <QueryClientProvider client={queryClient}>
        <KycDaoProvider networkId={nearNetworkEnv} config={{}}>
          <KycDaoExample />
        </KycDaoProvider>
      </QueryClientProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
