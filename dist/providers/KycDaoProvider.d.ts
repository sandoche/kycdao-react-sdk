/// <reference types="react" />
import type { SdkConfiguration } from '@kycdao/kycdao-sdk';
declare const KycDaoProvider: ({ children, networkId, config }: {
    children: JSX.Element;
    networkId: string;
    config: SdkConfiguration | object;
}) => JSX.Element;
export default KycDaoProvider;
