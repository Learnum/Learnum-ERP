import { RegimeDetailsViewModel } from "./regime-details.model";
import { UserTaxComputationViewModel } from "./user-tax-computation-view.model";

export class UserTaxComputationSummeryViewModel
{
   public  regimeDetails : RegimeDetailsViewModel;
   public userTaxComputationViewModels : Array<UserTaxComputationViewModel>;

   constructor()
   {
      this.regimeDetails = new RegimeDetailsViewModel();
      this.userTaxComputationViewModels = [];
   }
}