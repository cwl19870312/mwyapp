import { FormControl } from '@angular/forms';

export class CommonValidators {
    static isMobile(c: FormControl) {
        const MOBILE_REGEXP = /^1\d{10}$/;
        return (c.value.length == 11 && MOBILE_REGEXP.test(c.value)) ? null : {
            isMobile: { valid: false, error: "手机号格式不正确" }
        }
    }

    static isIdCard(c: FormControl) {
        const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        let pass = false;
        let idCard = c.value;
        if (regIdCard.test(idCard)) {
            if (idCard.length == 18) {
                var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9,
                    10, 5, 8, 4, 2); // 将前17位加权因子保存在数组里
                var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
                var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
                for (var i = 0; i < 17; i++) {
                    idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                }

                var idCardMod = idCardWiSum % 11;// 计算出校验码所在数组的位置
                var idCardLast = idCard.substring(17);// 得到最后一位身份证号码

                // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if (idCardMod == 2) {
                    if (idCardLast == "X" || idCardLast == "x") {
                        pass = true;
                    } else {
                        pass = false;
                    }
                } else {
                    // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    if (idCardLast == idCardY[idCardMod]) {
                        pass = true;
                    } else {
                        pass = false;
                    }
                }
            }
        } else {
            pass = false;
        }
        return pass ? null : {
            isIdCard: { valid: false, error: "身份证格式不正确" }
        }
    }

    static isName(c: FormControl) {
        const NAME_REGEXP = /^[\u4E00-\u9FA5]{2,}$/;
        return NAME_REGEXP.test(c.value) ? null : {
            isName: { valid: false, error: "请输入正确的姓名" }
        }
    }
}