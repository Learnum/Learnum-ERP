import { Injectable } from "@angular/core";
import { ConfigurationSettings } from "src/app/core/models/configuration";
import { APIService } from "src/app/core/services/apiService";

@Injectable({ providedIn: 'root' })

export class InsertITDSubmissionToPOIService {
  urlInsertITDSubmissionToPOI = 'ProofOfInvestments/InsertITDSubmissionToPOI';
  constructor(public apiService: APIService) { }

  InsertITDSubmissionToPOI(declarationTypeId, InvestmentCategoryId) {
    let itd_Id: any;
    let poi_Id: any;
    let loginUserRoleId = ConfigurationSettings.getUserRoleId()

    if (loginUserRoleId != 3) {//not employee
      itd_Id = localStorage.getItem('itd_UserInvestmentMappingId');
      poi_Id = localStorage.getItem('poi_UserInvestmentMappingId');
    }
    else {
      itd_Id = ConfigurationSettings.getUserInvestmentMappingId();
      poi_Id = ConfigurationSettings.getPOIUserInvestmentMappingId();
    }
    let param = {
      declarationTypeId: declarationTypeId,
      InvestmentCategoryId: InvestmentCategoryId,
      companyFinancialId: ConfigurationSettings.getCompanyFinancialId(),
      itd_UserInvestmentMappingId: itd_Id,
      poi_UserInvestmentMappingId: poi_Id

    };
    return this.apiService.postData(this.urlInsertITDSubmissionToPOI, param);
  }
}
