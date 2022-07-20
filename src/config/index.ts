import type { SdkConfiguration } from '@kycdao/kycdao-sdk';

const getConfig = async (networkId = 'testnet'): Promise<SdkConfiguration> => {
  const { BlockchainNetworks, KycDaoEnvironments, VerificationTypes } = await import('@kycdao/kycdao-sdk');

  const configMap = new Map([
    [
      'testnet',
      {
        baseUrl: 'https://staging.kycdao.xyz/api/frontend',
        enabledBlockchainNetworks: [BlockchainNetworks.NearTestnet],
        enabledVerificationTypes: [VerificationTypes.KYC],
        environment: KycDaoEnvironments.test,
      },
    ],
    [
      'mainnet',
      {
        baseUrl: 'https://staging.kycdao.xyz/api/frontend',
        enabledBlockchainNetworks: [BlockchainNetworks.NearMainnet],
        enabledVerificationTypes: [VerificationTypes.KYC],
        environment: KycDaoEnvironments.test,
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
