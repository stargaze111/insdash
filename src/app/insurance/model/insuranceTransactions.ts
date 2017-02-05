export class InsuranceTransactions {
    constructor(
        public insuranceType: string, 
        public quoteId: string,
        public policyId: string,
        public quoteAmount: string,
        public policyAmount: string,
        public modified: string,
        public created: string,        
        public createdDate: string,
        public lastUpdatedDate: string       
        ){}
}