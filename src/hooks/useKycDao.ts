import { useContext } from 'react';

import KycDaoContext from '../context/KycDaoContext';

const useKycDao = () => {
  const context = useContext(KycDaoContext);

  if (context === undefined) {
    throw new Error(`useKycDao must be used within a KycDaoProvider`);
  }

  const { kycDao } = context;

  return kycDao;
};

export default useKycDao;
