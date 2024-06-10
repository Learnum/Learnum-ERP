import { Deduction80DPOIDetails } from "./deduction80DPOIDetails.model";

export class Deduction80DPOI {
    deduction80DId: number;
    UserInvestmentMappingId: number;
    Particulars: string;
    selfAndFamily: number | null;
    parents: number | null;
    selfAge: string;
    parentAge: string;
    totalEligibleSelf: number | null;
    totalEligibleParent: number | null;
    totalEligible: number | null;
    totalDeclaredSelf: number | null;
    totalDeclaredParent: number | null;
    totalDeclared: number | null;
    IsActive: boolean | null;
    AddedBy: number | null;
    AddedDate: Date | string | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | string | null;

    constructor() {
        this.deduction80DId = 0;
        this.UserInvestmentMappingId=0;
        this.Particulars = "";
        this.selfAndFamily = 0;
        this.parents = 0;
        this.selfAge = "";
        this.parentAge = "";
        this.totalEligibleSelf = 0;
        this.totalEligibleParent = 0;
        this.totalEligible = 0;
    }
}

export class Deduction80DPOITempModel {
    Deduction80DDetailsId_mIP: number;
    Deduction80DDetailsId_mE: number;
    Deduction80DDetailsId_pHC: number;
    Deduction80DId: number | null;
    selfAge: string;
    parentAge: string;
    MedicalInsurancePreminum_Particulars: string;
    PreventiveHealthCheckUp_Particulars: string;
    MedicalExpenditure_Particulars: string;

    MedicalInsurancePreminumSelf: number;
    MedicalInsurancePreminumSelfSubCategoryId: number;
    MedicalInsurancePreminumSelfEmployerDefinedAmount: number;
    MedicalInsurancePreminumSelfQualifiedAmount: number;
    MedicalInsurancePreminumSelfRemark: string;

    MedicalInsurancePreminumParent: number;
    MedicalInsurancePreminumParentSubCategoryId: number;
    MedicalInsurancePreminumParentEmployerDefinedAmount: number;
    MedicalInsurancePreminumParentQualifiedAmount: number;
    MedicalInsurancePreminumParentRemark: string;

    PreventiveHealthCheckUpSelf: number;
    PreventiveHealthCheckUpSelfSubCategoryId: number;
    PreventiveHealthCheckUpSelfEmployerDefinedAmount: number;
    PreventiveHealthCheckUpSelfQualifiedAmount: number;
    PreventiveHealthCheckUpSelfRemark: string;

    PreventiveHealthCheckUpParent: number;
    PreventiveHealthCheckUpParentSubCategoryId: number;
    PreventiveHealthCheckUpParentEmployerDefinedAmount: number;
    PreventiveHealthCheckUpParentQualifiedAmount: number;
    PreventiveHealthCheckUpParentRemark: string;

    MedicalExpenditureSelf: number;
    MedicalExpenditureSelfSubCategoryId: number;
    MedicalExpenditureSelfEmployerDefinedAmount: number;
    MedicalExpenditureSelfQualifiedAmount: number;
    MedicalExpenditureSelfRemark: string;

    MedicalExpenditureParent: number;
    MedicalExpenditureParentSubCategoryId: number;
    MedicalExpenditureParentEmployerDefinedAmount: number;
    MedicalExpenditureParentQualifiedAmount: number;
    MedicalExpenditureParentRemark: string;

    constructor() {
        this.Deduction80DDetailsId_mIP = 0;
        this.Deduction80DDetailsId_mE = 0;
        this.Deduction80DDetailsId_pHC = 0;
        this.Deduction80DId = 0;
        this.selfAge = "";
        this.parentAge = "";
        this.MedicalInsurancePreminum_Particulars = "";
        this.PreventiveHealthCheckUp_Particulars = "";
        this.MedicalExpenditure_Particulars = "";
        this.MedicalInsurancePreminumSelf = 0;
        this.MedicalInsurancePreminumParent = 0;
        this.PreventiveHealthCheckUpSelf = 0;
        this.PreventiveHealthCheckUpParent = 0;
        this.MedicalExpenditureSelf = 0;
        this.MedicalExpenditureParent = 0;
    }
}


export class Deduction80DPOITotalEligiblityModel {
    TotalSelfAndFamily: number;
    TotalParents: number;
    TotalEligibleSelf: number;
    TotalEligibleParent: number;
    TotalEligible: number;
    TotalDeclaredSelf: number;
    TotalDeclaredParent : number;
    TotalDeclared: number;

    MedicalInsurancePreminumSelfQualifiedAmount: number;
    PreventiveHealthCheckUpSelfQualifiedAmount: number;
    MedicalExpenditureSelfQualifiedAmount: number;
    MedicalInsurancePreminumParentQualifiedAmount: number;
    PreventiveHealthCheckUpParentQualifiedAmount: number;
    MedicalExpenditureParentQualifiedAmount: number;



    constructor() {
        this.TotalSelfAndFamily = 0;
        this.TotalParents = 0;
        this.TotalEligibleSelf = 0;
        this.TotalEligibleParent = 0;
        this.TotalEligible = 0;
        this.MedicalInsurancePreminumSelfQualifiedAmount=0;
        this.PreventiveHealthCheckUpSelfQualifiedAmount=0;
        this.MedicalExpenditureSelfQualifiedAmount=0;
        this.MedicalInsurancePreminumParentQualifiedAmount=0;
        this.PreventiveHealthCheckUpParentQualifiedAmount=0;
        this.MedicalExpenditureParentQualifiedAmount=0;
    }
}

export class Deduction80DPOIVM {
    public Deduction80DPOI: Deduction80DPOI;
    public Deduction80DListPOI: Array<Deduction80DPOIDetails>;

    constructor() {
        this.Deduction80DPOI = new Deduction80DPOI();
        this.Deduction80DListPOI = [];
    }
}

