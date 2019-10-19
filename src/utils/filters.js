/*
 * @Author: Superficial
 * @Date: 2019-10-08 14:24:18
 * @LastEditTime: 2019-10-09 21:40:17
 * @Description: 全局过滤器
 */
let dateFormat = time => {
    const date = new Date(time);
    const Time = {
        YY: date.getFullYear(),
        MM: date.getMonth() + 1,
        DD: date.getDate(),
        hh: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
    };

    for (let key in Time) {
        Time[key] = Time[key] < 10 ? `0${Time[key]}` : `${Time[key]}`;
    }
    return `${Time.YY}-${Time.MM}-${Time.DD} ${Time.hh}:${Time.mm}:${Time.ss}`;
};

export { dateFormat };
