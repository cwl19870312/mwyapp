export class Rebate{
    uid;
    member;
    member_uid;
    member_name;
    money;
    apply;
    apply_info;
    status;
    verify;
    add_date;
    update_date;
    status_detail;
    verify_detail;
    constructor(data){
        this.uid = data.uid;
        this.member = data.member;
        this.member_name = data.member_name;
        this.member_uid = data.member_uid;
        this.money = data.money;
        this.apply = data.apply;
        this.apply_info = data.apply_info;
        this.status = data.status;
        this.verify = data.verify;
        this.add_date = data.add_date;
        this.update_date = data.update_date;
        this.status_detail = data.status_detail;
        this.verify_detail = data.verify_detail;
    }
}

export class RebateCount{
    rebate_allow;
    rebate_pending;
    rebate_paid;
    constructor(data){
        this.rebate_allow = data.rebate_allow;
        this.rebate_pending = data.rebate_pending;
        this.rebate_paid = data.rebate_paid;
    }
}
