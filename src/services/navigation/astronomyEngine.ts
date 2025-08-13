import * as A from "astronomy-engine";
import {
  convertToDecimalDegrees,
  calculateSunPosition,
  calculateGyroError,
  Latitude,
  AzimuthZn,
  Degrees,
  HourAngle
} from "../../../packages/core-astro";

/**
 * 使用 Astronomy Engine 計算 GHA/DEC
 * 輸入格式與原 performCalculation 相同
 */
export function performCalculationWithAstronomyEngine(inputData: {
  latDegrees: string;
  latMinutes: string;
  latDirection: 'N' | 'S';
  lonDegrees: string;
  lonMinutes: string;
  lonDirection: 'E' | 'W';
  utcIsoString: string; // 新增 UTC 時間 ISO 字串
  gyroAzimuth: string;
}) {
  // 轉換經緯度為十進制
  const lat = convertToDecimalDegrees(inputData.latDegrees, inputData.latMinutes, inputData.latDirection);
  const lon = convertToDecimalDegrees(inputData.lonDegrees, inputData.lonMinutes, inputData.lonDirection);

  // 1. 時間（UTC）
  const time = new Date(inputData.utcIsoString);

  // 2. 太陽地心視 EQD → RA/DEC
  const v_eqj = A.GeoVector(A.Body.Sun, time, true);
  const R = A.Rotation_EQJ_EQD(time);
  const v_eqd = A.RotateVector(R, v_eqj);
  const eq = A.EquatorFromVector(v_eqd);
  const RA_hours = eq.ra;        // 恆星時小時
  const DEC_deg  = eq.dec;       // 度

  // 3. GAST（視恆星時）
  const GAST_hours = A.SiderealTime(time);

  // 4. GHA
  const wrap24  = (x: number) => ((x % 24) + 24) % 24;
  const GHA_deg = 15 * wrap24(GAST_hours - RA_hours);

  // 5. 計算地方時角 t (LHA)
  let t = GHA_deg + lon;
  if (t < 0) t += 360;
  if (t >= 360) t -= 360;
  if (t > 180) t = t - 360; // 轉換為 -180 到 +180 範圍

  // 6. 太陽高度/方位
  const sunPosition = calculateSunPosition(lat as Degrees as unknown as Latitude, DEC_deg as Degrees, t as HourAngle);

  // 7. 電羅經差
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
    ghaTotal: formatDegreeMinute(GHA_deg),
    decTotal: formatDegreeMinute(DEC_deg)
  };
}
