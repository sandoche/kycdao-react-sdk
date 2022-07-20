import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { KycDaoProvider } from '../src';

describe('it', () => {
  it('loads without crashing', () => {
    const nearNetworkEnv = 'testnet';
    const div = document.createElement('div');
    ReactDOM.render(
      <KycDaoProvider networkId={nearNetworkEnv} config={{}}>
        <div>Your Kyc Dao Usage here</div>
      </KycDaoProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
