import { createContext } from 'react';
import { KycDao } from '@kycdao/kycdao-sdk';

interface KycDaoInterface {
  kycDao: KycDao | null;
}

const KycDaoContext = createContext<KycDaoInterface>({ kycDao: null });

export default KycDaoContext;
