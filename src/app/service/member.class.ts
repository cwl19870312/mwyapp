export class Member{
    id;
    uid;
    name;
    phone;
    category;
    parent;
    bank;
    bank_account_last4;
    bank_holder;
    add_date;
    update_date;
    children_total;
    category_detail;
    bank_detail;
    constructor(data){
        this.id = data.id + 180000;
        this.uid = data.uid;
        this.name = data.name;
        this.phone = data.phone;
        this.category = data.category;
        this.parent = data.parent;
        this.bank = data.bank;
        this.bank_account_last4 = data.bank_account_last4;
        this.bank_holder = data.bank_holder;
        this.add_date = data.add_date;
        this.update_date = data.update_date;
        this.children_total = data.children_total;
        this.category_detail = data.category_detail;
        this.bank_detail = data.bank_detail;
    }
}

export class MemberRegister{
    name;
    phone;
    password;
    code;
}

export class Auth{
    phone;
    password;
}

export class Info{
    uid;
    name;
    phone;
    cid;
    is_default;
    add_date;
    constructor(data){
        this.uid = data.uid;
        this.name = data.name;
        this.phone = data.phone;
        this.cid = data.cid;
        this.is_default = data.is_default;
        this.add_date = data.add_date;
    }
}
