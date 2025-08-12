// 應用服務層：負責 UI 表單值轉換、校驗、組合演算法輸入，並呼叫 core-astro 純函式

import {
  convertToDecimalDegrees,
  convertGHAToDegrees,
  calculateSunPosition,
  calculateGyroError,
  Latitude,
  AzimuthZn,
  Degrees,
  HourAngle
} from "../../packages/core-astro";

/**
 * 主要計算函數
 * 接收 UI 層原始表單值，負責轉換、校驗、組合演算法輸入
 */
export function performCalculation(inputData: {
  latDegrees: string;
  latMinutes: string;
  latDirection: 'N' | 'S';
  lonDegrees: string;
  lonMinutes: string;
  lonDirection: 'E' | 'W';
  ghaHours: string;
  ghaHoursMinutes: string;
  ghaMinutesSeconds: string;
  ghaMsMinutes: string;
  decDegrees: string;
  decMinutes: string;
  decDirection: 'N' | 'S';
  decCorrection?: string; // 赤緯修正（分），可選
  gyroAzimuth: string;
}) {
  // 轉換經緯度為十進制
  const lat = convertToDecimalDegrees(inputData.latDegrees, inputData.latMinutes, inputData.latDirection);
  const lon = convertToDecimalDegrees(inputData.lonDegrees, inputData.lonMinutes, inputData.lonDirection);

  // 轉換手動輸入的 GHA 為度數
  const ghaValue = convertGHAToDegrees(
    inputData.ghaHours,
    inputData.ghaHoursMinutes,
    inputData.ghaMinutesSeconds,
    inputData.ghaMsMinutes
  );

  // 轉換手動輸入的 DEC 為十進制度數
  const decValue = convertToDecimalDegrees(inputData.decDegrees, inputData.decMinutes, inputData.decDirection);

  // 加入赤緯修正 d corr（單位分），未填入則為 0
  const decCorrection = parseFloat(inputData.decCorrection || '0') || 0;
  const decTotalValue = decValue + decCorrection / 60;

  // 計算船至太陽的角度 t (地方時角 LHA)
  let t = ghaValue + lon;
  if (t < 0) t += 360;
  if (t >= 360) t -= 360;
  if (t > 180) t = t - 360; // 轉換為 -180 到 +180 範圍

  // 使用指定公式計算太陽位置
  const sunPosition = calculateSunPosition(lat as Degrees as unknown as Latitude, decTotalValue as Degrees, t as HourAngle);

  // 計算電羅經差
  const gyroAz = parseFloat(inputData.gyroAzimuth) as Degrees as unknown as AzimuthZn;
  const gyroError = calculateGyroError(sunPosition.znAngle, gyroAz);

  // 格式化為「度°分'」分到小數點後一位
  function formatDegreeMinute(value: number) {
    const deg = Math.trunc(value);
    const min = ((Math.abs(value) - Math.abs(deg)) * 60);
    return `${deg}°${min.toFixed(1)}'`;
  }

  return {
    gyroError: gyroError.formattedError,
    absoluteError: gyroError.absoluteError,
    trueAzimuth: sunPosition.znAngle.toFixed(1) + '°',
    calculatedT: formatDegreeMinute(t),
    altitude: sunPosition.altitude.toFixed(1) + '°',
    azimuth: sunPosition.azimuthFormatted,
    znAngle: sunPosition.znAngle.toFixed(1) + '°',
    ghaTotal: formatDegreeMinute(ghaValue),
    decTotal: formatDegreeMinute(decTotalValue)
  };
}
