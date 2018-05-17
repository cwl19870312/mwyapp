import { Bank } from "./bank.class";

export class Apply{
    uid;
    name;
    phone;
    cid;
    status;
    bank_title;
    rebate_detail;
    is_active;
    add_date;
    update_date;
    status_detail;
    bank_detail;
    constructor(data){
        this.uid = data.uid;
        this.name = data.name;
        this.phone = data.phone;
        this.cid = data.cid;
        this.status = data.status;
        this.bank_title = data.bank_title;
        this.rebate_detail = data.rebate_detail;
        this.is_active = data.is_active;
        this.add_date = data.add_date;
        this.update_date = data.update_date;
        this.status_detail = data.status_detail;
        this.bank_detail = new Bank(data.bank_detail);
    }

    inDanger(){
        let danger_status = ['FAIL', 'INVALID']
        return danger_status.indexOf(this.status) == 0;
    }
}
