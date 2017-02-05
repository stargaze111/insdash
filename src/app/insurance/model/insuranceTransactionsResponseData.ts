import { InsuranceTransactionsSummary }    from '../model/insuranceTransactionsSummary';
import { InsuranceTransactions }           from '../model/insuranceTransactions';
import { InsuranceTransactionsGroupsSummary }           from '../model/insuranceTransactionsGroupsSummary';

export class InsuranceTransactionsResponseData {
    constructor(
        public summary: InsuranceTransactionsSummary, 
        public groupsSummary: InsuranceTransactionsGroupsSummary, 
        public transactions: InsuranceTransactions[]
        ){}
}