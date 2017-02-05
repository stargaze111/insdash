import { InsuranceTransactionsResponseData }           from '../model/insuranceTransactionsResponseData';
import { ErrorData }           from '../model/errorData';

export class InsuranceTransactionsResponse {
    constructor(
        public status: string, 
        public data: InsuranceTransactionsResponseData,
        public error: ErrorData
        ){}
}