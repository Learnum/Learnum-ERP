import { Injectable } from "@angular/core";
import { ConfigurationSettings } from "src/app/core/models/configuration";
import { APIService } from "src/app/core/services/apiService";

@Injectable({ providedIn: "root" })
export class UploadService {
  private downloadExcelFileUrl: string = "";
  private uploadBulkEmployeesUrl: string = "ChallanDetails/insertbulkemployeerecord";

  constructor(private apiService: APIService) { }

  getTemplateBites() {
    return this.apiService.getData(
      this.downloadExcelFileUrl);
  }

  uploadBulkEmployees(formData: FormData) {
    let returnId = 11 ;
    let deductorId = 10;
    let userId = 20 //ConfigurationSettings.getUserId();
    formData.append("returnId", returnId.toString());
    formData.append("deductorId", deductorId.toString());
    return this.apiService.postBlob(
      this.uploadBulkEmployeesUrl +
      "/" +
      returnId +
      "/" +
      deductorId,
      formData
    );
  }
}
