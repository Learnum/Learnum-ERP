import { InvestmentSubmissionDetailsModel } from './investment-submission-details.model';
import { InvestmentSubmissionHeaderModel } from './investment-submission-header.model';

export class ITDSubmissionModel {
    public InvestmentSubmissionDetails: Array<InvestmentSubmissionDetailsModel>;
    public InvestmentSubmissionHeader: InvestmentSubmissionHeaderModel;
    

    constructor() {
        this.InvestmentSubmissionDetails = [];
    }
}