// 時間相關計算工具

export function getUtcFromLocal(localDate: string, localTime: string, timezone: string): string {
  if (!localDate || !localTime || !timezone) return "";
  try {
    const [year, month, day] = localDate.split('-').map(Number);
    const [hours, minutes, seconds] = localTime.split(':').map(Number);

    // Create a Date object representing the local time components in UTC
    // This effectively treats the input localDate/localTime as if they were UTC
    const localTimeAsUtc = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

    const timezoneOffset = parseInt(timezone);
    // UTC = local - timezone value
    const utcTime = new Date(localTimeAsUtc.getTime() - (timezoneOffset * 60 * 60 * 1000));
    return utcTime.toISOString().slice(0, 19);
  } catch {
    return "";
  }
}

export function getGhaQueryTime(utcTime: string, reductionSecs: number): string {
  try {
    // GHA查詢時間 = UTC時間減去秒差
    const utcMillis = Date.parse(utcTime + "Z");
    const adjustedTime = new Date(utcMillis - reductionSecs * 1000);
    const yyyy = adjustedTime.getUTCFullYear();
    const mm = String(adjustedTime.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(adjustedTime.getUTCDate()).padStart(2, '0');
    const hh = String(adjustedTime.getUTCHours()).padStart(2, '0');
    const min = String(adjustedTime.getUTCMinutes()).padStart(2, '0');
    const sec = String(adjustedTime.getUTCSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec} UTC`;
  } catch {
    return "";
  }
}
