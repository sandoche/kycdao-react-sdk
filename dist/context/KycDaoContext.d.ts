/// <reference types="react" />
import { KycDao } from '@kycdao/kycdao-sdk';
interface KycDaoInterface {
    kycDao: KycDao | null;
}
declare const KycDaoContext: import("react").Context<KycDaoInterface>;
export default KycDaoContext;
