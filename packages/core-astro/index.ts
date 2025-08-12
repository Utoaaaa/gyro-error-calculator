/**
 * 品牌型別定義
 */
export type Degrees = number & { __brand: "Degrees" };
export type Radians = number & { __brand: "Radians" };
export type Longitude = number & { __brand: "Longitude" };
export type Latitude = number & { __brand: "Latitude" };
export type AzimuthZn = number & { __brand: "AzimuthZn" };
export type HourAngle = number & { __brand: "HourAngle" };

/**
 * 角度正規化工具
 */
export function wrap360(deg: number): Degrees {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d as Degrees;
}
export function wrap180(deg: number): Degrees {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d as Degrees;
}
export function clampLat(lat: number): Latitude {
  return Math.max(-90, Math.min(90, lat)) as Latitude;
}

/**
 * 將度/分格式轉換為十進制度數
 */
export function convertToDecimalDegrees(degrees: string, minutes: string, direction: 'N' | 'S' | 'E' | 'W'): Degrees {
  const deg = parseFloat(degrees) || 0;
  const min = parseFloat(minutes) || 0;
  const decimal = deg + min / 60;
  const value = (direction === 'S' || direction === 'W') ? -decimal : decimal;
  return Object.is(value, -0) ? 0 as Degrees : value as Degrees;
}

/**
 * 將GHA時分秒轉換為度數
 */
export function convertGHAToDegrees(
  hours: string, 
  hoursMinutes: string, 
  minutesSeconds: string, 
  msMinutes: string
): number {
  const h = parseFloat(hours) || 0;
  const hm = parseFloat(hoursMinutes) || 0;
  const ms = parseFloat(minutesSeconds) || 0;
  const msm = parseFloat(msMinutes) || 0;
  const hoursPart = h + hm / 60;
  const minutesSecondsPart = ms + msm / 60;
  return hoursPart + minutesSecondsPart;
}

/**
 * 度數轉弧度
 */
export function toRadians(degrees: Degrees): Radians {
  return (degrees * Math.PI / 180) as Radians;
}

/**
 * 型別轉換工具
 */
export function latitudeToDegrees(lat: Latitude): Degrees {
  return (lat as number) as Degrees;
}
export function hourAngleToDegrees(h: HourAngle): Degrees {
  return (h as number) as Degrees;
}
export function degreesToAzimuthZn(deg: Degrees): AzimuthZn {
  return (deg as number) as AzimuthZn;
}

/**
 * 弧度轉度數
 */
export function toDegrees(radians: Radians): Degrees {
  return (radians * 180 / Math.PI) as Degrees;
}

/**
 * 計算太陽高度角和方位角（全部使用角度計算）
 */
export function calculateSunPosition(
  lat: Latitude,
  dec: Degrees,
  t: HourAngle
) {
  const latRad = toRadians(latitudeToDegrees(lat));
  const decRad = toRadians(dec);
  const tRad = toRadians(hourAngleToDegrees(t));
  const cosX = Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(tRad);
  const x = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosX))) as Radians);
  const altitude = (90 - x) as Degrees;
  const xRad = toRadians(x);
  const sinX = Math.sin(xRad);
  if (sinX === 0) {
    return { altitude, azimuth: "無法計算", azimuthFormatted: "無法計算", znAngle: 0 as AzimuthZn };
  }
  const cosAz = (Math.sin(decRad) - Math.sin(latRad) * cosX) / (Math.cos(latRad) * sinX);
  const azimuthAngle = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosAz))) as Radians);
  const isNorthernHemisphere = (lat as number) >= 0;
  const hemisphere = isNorthernHemisphere ? 'N' : 'S';
  const isEast = (t as number) < 0;
  const direction = isEast ? 'E' : 'W';
  const azimuthFormatted = `${hemisphere} ${azimuthAngle.toFixed(1)}° ${direction}`;
  let znAngle: AzimuthZn;
  if (isNorthernHemisphere) {
    znAngle = isEast
      ? degreesToAzimuthZn(azimuthAngle)
      : degreesToAzimuthZn(wrap360(360 - (azimuthAngle as number)));
  } else {
    znAngle = isEast
      ? degreesToAzimuthZn(wrap360(180 - (azimuthAngle as number)))
      : degreesToAzimuthZn(wrap360(180 + (azimuthAngle as number)));
  }
  return { altitude, azimuth: azimuthAngle, azimuthFormatted, znAngle };
}

/**
 * 計算電羅經差
 */
export function calculateGyroError(trueAzimuth: AzimuthZn, gyroAzimuth: AzimuthZn) {
  const errorValue = (trueAzimuth as number) - (gyroAzimuth as number);
  let normalizedError = wrap180(errorValue);
  const errorDirection = (normalizedError as number) >= 0 ? 'E' : 'W';
  const absoluteError = Math.abs(normalizedError as number);
  const formattedError = `${absoluteError.toFixed(1)}° ${errorDirection}`;
  return { normalizedError, formattedError, absoluteError };
}
