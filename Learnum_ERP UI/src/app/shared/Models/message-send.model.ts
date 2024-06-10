export class MessageSendModel {

    chatId :number;
    chat :string;
    fromUserFinancialId :number;
    toUserFinancialId :number;
    fromCompanyFinancialId :number;
    toCompanyFinancialId :number;
    isRead :boolean | null;
    roleId :number;
    isCount :boolean|null;
    createdBy: number | null;
    updatedBy: number | null;
    createdDate: Date | string | null;
    updatedDate: Date | string | null;
    constructor()
    {
        this.isCount=false
    }
}
