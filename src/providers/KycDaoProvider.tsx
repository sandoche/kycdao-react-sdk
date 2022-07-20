import React, { useEffect, useMemo, useState } from 'react';
import type { KycDao, SdkConfiguration } from '@kycdao/kycdao-sdk';

import getConfig from '../config';
import KycDaoContext from '../context/KycDaoContext';

const KycDaoProvider = ({ children, networkId = 'testnet', config }: { children: JSX.Element; networkId: string; config: SdkConfiguration | object }) => {
  const [kycDao, setKycDao] = useState<KycDao | null>(null);

  useEffect(() => {
    const initKycDao = async () => {
      const { KycDao } = await import('@kycdao/kycdao-sdk');
      const defaultConfig = await getConfig(networkId);
      const kycDaoInitialized = await KycDao.initialize({
        ...defaultConfig,
        ...config,
      });
      setKycDao(kycDaoInitialized.kycDao);
    };

    initKycDao();
  }, [networkId, config]);

  const contextValue = useMemo(() => ({ kycDao }), [kycDao]);

  return <KycDaoContext.Provider value={contextValue}>{children}</KycDaoContext.Provider>;
};

export default KycDaoProvider;
