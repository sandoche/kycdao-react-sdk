import 'react-app-polyfill/ie11';
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useKycDao } from '../.';

const KycDaoExample = () => {
  const kycDao = useKycDao();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isKycCompleted, setIsKycCompleted] = React.useState(false);
  const [isKycValid, setIsKycValid] = React.useState(false);
  const counter = React.useRef(0);

  // A function to open the modal and load the verification Data
  const runKycModal = React.useCallback(async () => {
    if (!kycDao) {
      return;
    }

    setIsLoading(true);

    const { VerificationTypes } = await import('@kycdao/kycdao-sdk');

    const verificationData = {
      email: 'fake@email.com',
      isEmailConfirmed: true,
      taxResidency: 'FR',
      isLegalEntity: false,
      verificationType: VerificationTypes.KYC,
      termsAccepted: true,
    };

    const options = {
      personaOptions: {
        onCancel: () => {
          setIsLoading(false);
        },
        onComplete: async () => {
          setIsKycCompleted(true);
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      },
    };

    await kycDao.registerOrLogin();
    const { KYC } = await kycDao.checkVerificationStatus();

    if (!KYC) {
      kycDao.startVerification(verificationData, options);
    }
  }, [kycDao]);

  // Run the KYC modal if connected to the smartcontract
  React.useEffect(() => {
    const startKycAction = () => {
      if (!isKycValid && kycDao?.connectedWallet && counter.current === 0) {
        // to avoid multiple calls to registerOrLogin
        counter.current += 1;

        setIsLoading(true);
        runKycModal();
      }
    };

    startKycAction();
  }, [isKycValid, kycDao?.connectedWallet, runKycModal]);

  // Start minting the tokens if the KYC is completed
  const mintSbt = async () => {
    if (!kycDao) {
      return;
    }

    setIsLoading(true);
    await kycDao.startMinting({
      disclaimerAccepted: true,
    });
    setIsLoading(false);
  };

  // this example uses useQuery to make it simpler to poll the api to get the KYC status
  const { isLoading: validationLoading } = useQuery(
    ['validate-kyc'],
    () => {
      return kycDao && kycDao.checkVerificationStatus();
    },
    {
      refetchOnWindowFocus: true,
      refetchInterval: 2000,
      enabled: kycDao ? kycDao.walletConnected : false,
      onSuccess: data => {
        if (data?.KYC === true) {
          setIsKycValid(true);
        }
      },
    }
  );

  // Start the connection to the smartcontract
  const connect = async () => {
    if (!kycDao) {
      return;
    }

    counter.current = 0;

    setIsLoading(true);
    await kycDao.connectWallet('Near');
  };

  const waitingForValidation = isKycCompleted && !isKycValid;
  const isLoadingOrWaitingForValidation =
    isLoading || validationLoading || waitingForValidation;

  return (
    <div>
      {isKycValid ? (
        <>
          <button onClick={mintSbt} disabled={isLoadingOrWaitingForValidation}>
            {isLoadingOrWaitingForValidation ? 'Loading...' : 'Mint SBT'}
          </button>
        </>
      ) : (
        <>
          <button onClick={connect} disabled={isLoadingOrWaitingForValidation}>
            {isLoadingOrWaitingForValidation
              ? 'Loading...'
              : 'Connect & start Kyc'}
          </button>
        </>
      )}
    </div>
  );
};

export default KycDaoExample;
