export class CommonFunctions {

    static dateToWeekDate(date?: Date): string {
        if(!date) date = new Date();
        let firstDay = new Date(date.getFullYear(), 0, 1);
        let dateDiff = date.getTime() - firstDay.getTime();
        let msPerDay = 1000 * 60 * 60 * 24;
        let diffDays = Math.ceil(dateDiff / msPerDay) + 1;
        let weekData = Math.ceil(diffDays / 7);
        let monthData = weekData % 4 + 1;
        let dayData = date.getDay() > 0 ? date.getDay() : 7;
        let dateData = monthData + ':' + dayData;
        return dateData;
    }

    static stringToHTML(string: String): string {
        let html = '';
        if (string) {
            let temp = string.split('\n');
            temp.forEach(item => {
                html += `<p>${item}</p>`;
            })
        }
        return html;
    }

    static ossImg(url: string, width: number, height: number): string {
        if (!url) return '';
        let _url = url.split('?')[0];
        let resize = `/resize,w_${width},limit_0`;
        let crop = `/crop,w_${width},h_${height},g_center`;
        // if (_url.indexOf('?') == -1) {
        //     _url += '?x-oss-process=image';
        // } else {
        //     _url += '&x-oss-process=image';
        // }
        _url += `?x-oss-process=image${resize}${crop}`;
        return _url;
    }

    static dayToShowDay(day: number): string {
        const showDays = ['日', '一', '二', '三', '四', '五', '六'];
        return showDays[day];
    }
}
