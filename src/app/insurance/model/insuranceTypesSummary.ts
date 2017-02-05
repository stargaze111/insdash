export class InsuranceTypesSummary {
    constructor(
        public name: string,
        public quotesCount: string, 
        public policiesCount: string,
        public totalPoliciesAmount: string,
        public totalQuotesAmount: string
        ){}
}
