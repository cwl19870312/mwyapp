export class Config {
    label;
    key;
    group;
    value;
    args;
    constructor(data){
        this.label = data.label;
        this.key = data.key;
        this.group = data.group;
        this.value = data.value;
        this.args = data.args;
    }
}