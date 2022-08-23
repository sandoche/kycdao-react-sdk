// eslint-disable-next-line
import type { SdkConfiguration } from '@kycdao/kycdao-sdk';

const getConfig = async (networkId = 'testnet'): Promise<SdkConfiguration> => {
  const { BlockchainNetworks, VerificationTypes } = await import('@kycdao/kycdao-sdk');

  const configMap = new Map([
    [
      'testnet',
      {
        baseUrl: 'https://staging.kycdao.xyz',
        enabledBlockchainNetworks: [BlockchainNetworks.NearTestnet],
        enabledVerificationTypes: [VerificationTypes.KYC],
        demoMode: true,
      },
    ],
    [
      'mainnet',
      {
        baseUrl: 'https://kycdao.xyz',
        enabledBlockchainNetworks: [BlockchainNetworks.NearMainnet],
        enabledVerificationTypes: [VerificationTypes.KYC],
      },
    ],
  ]);

  const config = configMap.get(networkId);

  if (!config) {
    throw new Error(`No config for networkId: ${networkId}`);
  }

  return config;
};

export default getConfig;
