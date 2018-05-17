export class Bank {
    uid;
    title;
    features;
    info;
    thumbnail_icon;
    thumbnail_card;
    apply_url;
    progress_url;
    is_apply;
    is_progress;
    content_describe;
    content_apply;
    push;
    is_active;
    order_number;
    add_date;
    update_date;
    constructor(data){
        this.uid = data.uid;
        this.title = data.title;
        this.features = data.features;
        this.info = data.info;
        this.thumbnail_icon = data.thumbnail_icon;
        this.thumbnail_card = data.thumbnail_card;
        this.apply_url = data.apply_url;
        this.progress_url = data.progress_url;
        this.is_apply = data.is_apply;
        this.progress_url = data.progress_url;
        this.content_describe = data.content_describe;
        this.content_apply = data.content_apply;
        this.push = data.push;
        this.is_active = data.is_active;
        this.order_number = data.order_number;
        this.add_date = data.add_date;
        this.update_date = data.update_date;
    }
}
