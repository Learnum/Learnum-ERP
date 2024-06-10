import { environment } from "src/environments/environment";

export class ConfigurationSettings {
    //BASE_API_URL
    public static get BASE_API_URL(): string { return environment.BASE_API_URL; }
    public static get Masters(): string { return "Masters"; }
    public static get Transactions(): string { return "Transactions"; }
    public static get ITax(): string { return "ITax"; }
    public static get Dashboard(): string { return "Dashboard"; }
    public static get Report(): string { return "Report"; }
    public static get Administration(): string { return "Administration"; }
    public static get Leads(): string { return "Leads"; }
    public static get RateCard(): string { return "RateCard"; }
    public static get Details(): string { return "Details"; }
    public static get Documents(): string { return "Documents"; }
    public static get Admin(): string { return "Admin"; }
    public static get FoodCouponsMaxAmount(): string { return "FoodCouponsMaxAmount"; }
    public static get Deduction80CMaximumAmount(): string { return "Deduction80CMaximumAmount"; }
    public static get HPPreviewTotalExemptionAmount(): string { return "HPPreviewTotalExemptionAmount"; }
    public static get FoodCouponsSubCatId(): string { return "FoodCouponsSubCatId"; }
    public static get ChildrenEducationAllowance1childrenSubCatId(): string { return "ChildrenEducationAllowance1childrenSubCatId"; }
    public static get ChildrenEducationAllowance2childrenSubCatId(): string { return "ChildrenEducationAllowance2childrenSubCatId"; }
    public static get ChildrenAllowanceHostel1ChildSubCatId(): string { return "ChildrenAllowanceHostel1ChildSubCatId"; }
    public static get ChildrenAllowanceHostel2ChildrenSubCatId(): string { return "ChildrenAllowanceHostel2ChildrenSubCatId"; }
    public static get ChildrenEducationAllowance2childrenMaxAmount(): string { return "ChildrenEducationAllowance2childrenMaxAmount"; }
    public static get ChildrenEducationAllowance1childrenMaxAmount(): string { return "ChildrenEducationAllowance1childrenMaxAmount"; }
    public static get ChildrenAllowanceHostel1ChildMaxAmount(): string { return "ChildrenAllowanceHostel1ChildMaxAmount"; }
    public static get ChildrenAllowanceHostel2ChildrenMaxAmount(): string { return "ChildrenAllowanceHostel2ChildrenMaxAmount"; }
    public static get SelfOccupiedSubCategoryId(): string { return "SelfOccupiedSubCategoryId"; }
    public static get LetOutSubCategoryId(): string { return "LetOutSubCategoryId"; }
    public static get UnderConstructionPropertyId(): string { return "UnderConstructionPropertyId"; }
    public static get AdditionalInterestFrom80EEA(): string { return "80EEAAdditionalInterestFrom"; }
    public static get PreviousEmploymentSalarySubCatId(): string { return "PreviousEmploymentSalarySubCatId"; }
    public static get MedicalExpenditureParentEmployerDefinedAmount(): string { return "MedicalExpenditureParentEmployerDefinedAmount"; }
    public static get MedicalExpenditureSelfEmployerDefinedAmount(): string { return "MedicalExpenditureSelfEmployerDefinedAmount"; }

    public static get PreventiveHealthCheckUpSelfEmployerDefinedAmount(): string { return "PreventiveHealthCheckUpSelfEmployerDefinedAmount"; }
    public static get PreventiveHealthCheckUpParentEmployerDefinedAmount(): string { return "PreventiveHealthCheckUpParentEmployerDefinedAmount"; }

    public static get MedicalInsurancePreminumSelfEmployerDefinedAmount(): string { return "MedicalExpenditureParentEmployerDefinedAmount"; }
    public static get MedicalInsurancePreminumParentEmployerDefinedAmount(): string { return "MedicalExpenditureParentEmployerDefinedAmount"; }





    constructor() { }

    public static getUserToken(): string {
        let userToken = <string>localStorage["id_token"];
        return userToken;
    }

    public static getUserName(): string {
        let userName = <string>localStorage["UserName"];
        return userName;
    }

    public static getFullName(): string {
        let fullName = <string>localStorage["FullName"];
        return fullName;
    }

    public static getUserId(): number {
        let userId = <number>localStorage["UserId"];
        return userId;
    }

    public static getUserFinancialId(): number {
        let userFinancialId = <number>localStorage["UserFinancialId"];
        return userFinancialId;
    }

    public static getEmployeeTypeDetailsId(): number{
        let employeeTypeDetailsId = <number>localStorage["EmployeeTypeDetailsId"];
        return employeeTypeDetailsId
    }

    public static getRegisterUserId(): any {
        let registerUserId = <any>localStorage["RegisterUserId"];
        if (registerUserId == undefined || registerUserId == 'null') registerUserId = 0;
        return registerUserId;
    }

    public static getRegisterUserFinancialId(): any {
        let registerUserFinancialId = <any>localStorage["RegisterUserFinancialId"];
        if (registerUserFinancialId == undefined || registerUserFinancialId == 'null') registerUserFinancialId = 0;
        return registerUserFinancialId;
    }


    public static getUserRoleId(): number {
        let roleId = <number>localStorage["RoleId"];
        return roleId;
    }
    public static getUserRole(): string {
        let userRole = <string>localStorage["Role"];
        return userRole;
    }

    public static getCompanyUrl(): string {
        let companyUrl = <string>localStorage["CompanyUrl"];
        return companyUrl;
    }

    public static getCompanyName(): string {
        let companyName = <string>localStorage["CompanyName"];
        return companyName;
    }

    public static getInvestmentCycleTypeId(): number {
        let investmentCycleTypeId = <number>localStorage["InvestmentCycleTypeId"];
        return investmentCycleTypeId;
    }

    public static getCompanyId(): number {
        let companyId = <number>localStorage["CompanyId"];
        return companyId;
    }

    public static getCompanyFinancialId(): number {
        let companyFinancialId = <number>localStorage["CompanyFinancialId"];
        return companyFinancialId;
    }

    public static getUserInvestmentMappingId(): number {
        let loginUserRoleId = ConfigurationSettings.getUserRoleId();
        if (loginUserRoleId == 3)//employee
        {
            let userInvestmentMappingId = <number>localStorage["UserInvestmentMappingId"];
            return userInvestmentMappingId;
        }
        else {
            let userInvestMentmappingIdByEmployer: number = localStorage["UserInvestMentmappingIdByEmployer"] == null ? 0 : parseInt(localStorage["UserInvestMentmappingIdByEmployer"]);
            return userInvestMentmappingIdByEmployer;
        }
    }
    public static getFinancialYearStartDate(): Date {
        let fYearStartDate = <Date>localStorage["FYearStartDate"];
        let financialYearStartDate = new Date(fYearStartDate);
        return financialYearStartDate;
    }

    public static getFinancialYearEndDate(): Date {
        let fYearEndDate = <Date>localStorage["FYearEndDate"];
        let financialYearEndDate = new Date(fYearEndDate);
        return financialYearEndDate;
    }

    public static getAccessControlDetails() {
        let accessControlDetails = JSON.parse(localStorage.getItem("AccessControlDetails"));
        return accessControlDetails;
    }

    public static getHomePageByRole(): string {
        let homePage = <string>localStorage["HomePage"];
        return homePage;
    }

    public static removeRegisterIds() {
        localStorage.removeItem("RegisterUserId");
        localStorage.removeItem("RegisterUserFinancialId");
    }

    public static getAPPMiscSettingsDetails(Key: string) {
        let appMiscSettingsDetails = JSON.parse(localStorage.getItem("APPMiscSettingsDetails"));

        let appMiscSettings = appMiscSettingsDetails.filter(c => c.key == Key);
        if (appMiscSettings.length > 0) {
            return appMiscSettings[0].value;
        }
        return null;
    }

    public static getDob() {
        return localStorage.getItem("DOB")
    }
    public static getAge() {
        return localStorage.getItem("Age")
    }

    public static getDeclarationInvestmentCycleId(): number {
        let declarationInvestmentCycleId: number = localStorage["DeclarationInvestmentCycleId"] == null ? 0 : parseInt(localStorage["DeclarationInvestmentCycleId"]);
        //declarationInvestmentCycleId = 1;
        return declarationInvestmentCycleId;
    }
    public static setUserInvestMentmappingIdByEmployer(userInvestMentmappingIdByEmployer) {
        localStorage.setItem("UserInvestMentmappingIdByEmployer", userInvestMentmappingIdByEmployer)
    }
    public static setPOIUserInvestMentmappingIdByEmployer(poi_UserInvestmentMappingIdByEmployer) {
        localStorage.setItem("poi_UserInvestmentMappingIdByEmployer", poi_UserInvestmentMappingIdByEmployer)
    }
    public static setPOITrakkingOption(POITrakkingOption) {
        localStorage.setItem("POITrakkingOption", POITrakkingOption)
    }
    public static getPOITrakkingOption() {
        return localStorage.getItem("POITrakkingOption")
    }
    public static setITDeclarationOption(ITDeclarationOption)
    {
        localStorage.setItem("ITDeclarationOption",ITDeclarationOption)
    }
    public static getITDeclarationOption(){
        return localStorage.getItem("ITDeclarationOption")
    }

    public static setDeductorId(deductorId)
    {
        localStorage.setItem("deductorId",deductorId)
    }
    public static getDeductorId(){
        return localStorage.getItem("deductorId")
    }
    public static getMenu(): number {
        let Menu = JSON.parse(localStorage["Menu"]);
        return Menu;
    }
    public static getPOIUserInvestmentMappingId(): number {

        let loginUserRoleId = ConfigurationSettings.getUserRoleId();
        if (loginUserRoleId == 3)//employee 
        {
            let poi_UserInvestmentMappingId = <number>localStorage["POI_UserInvestmentMappingId"];
            return poi_UserInvestmentMappingId;
        }
        else {
            let poi_UserInvestmentMappingIdByEmployer: number = localStorage["poi_UserInvestmentMappingIdByEmployer"] == null ? 0 : parseInt(localStorage["poi_UserInvestmentMappingIdByEmployer"]);
            return poi_UserInvestmentMappingIdByEmployer;
        }
    }

    public static getIsPanAadharVerificationRequired(){
        return localStorage.getItem("IsPanAadharVerificationRequired");
    }

}
