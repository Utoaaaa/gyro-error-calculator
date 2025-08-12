// 時間相關計算工具

export function getUtcFromLocal(localDate: string, localTime: string, timezone: string): string {
  if (!localDate || !localTime || !timezone) return "";
  try {
    const localDateTime = new Date(`${localDate}T${localTime}`);
    const timezoneOffset = parseInt(timezone);
    const utcTime = new Date(localDateTime.getTime() - (timezoneOffset * 60 * 60 * 1000));
    return utcTime.toISOString().slice(0, 19);
  } catch {
    return "";
  }
}

export function getGhaQueryTime(utcTime: string, reductionSecs: number): string {
  try {
    const utcMillis = Date.parse(utcTime + "Z");
    const adjustedMillis = utcMillis - (reductionSecs * 1000);
    const adjustedTime = new Date(adjustedMillis);
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
