import type { SdkConfiguration } from '@kycdao/kycdao-sdk';
declare const getConfig: (networkId?: string) => Promise<SdkConfiguration>;
export default getConfig;
