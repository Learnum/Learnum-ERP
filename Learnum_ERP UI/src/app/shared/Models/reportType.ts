export enum ReportType {
    Details = 1,
    Summary = 2,
    HRADetails = 3,
    LTA = 4,
    LTC = 5,
    PreviousEmploymentSalaryDetails = 6,
    SelfOccupiedDetails = 7,
    LetOut = 8,
    UnderConstruction=9,
    DeemedLetOut=10,
    LIP=11,
    TDS=12,
    Summary1=13,
    
  }
  
  
  export class ReportSubCategory {
    public static HRA: number = 1;
    public static LTA: number = 2;
    public static LTC: number = 151;
    public static SelfOccupied: number = 6;
    public static LetOut: number = 7;
    public static UnderConstruction=156;
    public static DeemedLetOut=160;
    public static PreviousEmploymentSalary: number = 58;
    public static LIP: number = 27;
    public static TDS: number = 0;

  }