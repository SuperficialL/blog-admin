/*
 * @Author: Superficial
 * @Date: 2019-10-08 14:24:18
 * @LastEditTime: 2019-11-15 23:21:00
 * @Description: 全局过滤器
 */
/**
 * @description:
 * @param {time} 时间日期字符串
 * @return: 格式化后的时间字符串
 */
let dateFormat = time => {
  const date = new Date(time);
  const Time = {
    YY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    hh: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  };

  for (let key in Time) {
    Time[key] = Time[key] < 10 ? `0${Time[key]}` : `${Time[key]}`;
  }
  return `${Time.YY}-${Time.MM}-${Time.DD} ${Time.hh}:${Time.mm}:${Time.ss}`;
};

let statusFilter = status => {
  return status ? "发表" : "草稿";
};

export { dateFormat, statusFilter };
