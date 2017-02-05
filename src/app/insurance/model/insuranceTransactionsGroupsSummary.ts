import { InsuranceTypesSummary }           from '../model/insuranceTypesSummary';
import { CompaniesSummary }           from '../model/companiesSummary';

export class InsuranceTransactionsGroupsSummary {
    constructor(
        public insuranceTypeSummary: InsuranceTypesSummary[], 
        public companiesSummary: CompaniesSummary[]
        ){}
}
