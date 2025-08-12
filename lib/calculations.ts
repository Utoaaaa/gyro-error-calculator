// 航海天文計算功能模組

/**
 * 將度/分格式轉換為十進制度數
 */
export const convertToDecimalDegrees = (degrees: string, minutes: string, direction: 'N' | 'S' | 'E' | 'W'): number => {
  const deg = parseFloat(degrees) || 0;
  const min = parseFloat(minutes) || 0;
  const decimal = deg + min / 60;
  return (direction === 'S' || direction === 'W') ? -decimal : decimal;
};

/**
 * 將GHA時分秒轉換為度數
 * @param hours 小時部分度數
 * @param hoursMinutes 小時部分分數
 * @param minutesSeconds 分秒部分度數
 * @param msMinutes 分秒部分分數
 */
export const convertGHAToDegrees = (
  hours: string, 
  hoursMinutes: string, 
  minutesSeconds: string, 
  msMinutes: string
): number => {
  const h = parseFloat(hours) || 0;
  const hm = parseFloat(hoursMinutes) || 0;
  const ms = parseFloat(minutesSeconds) || 0;
  const msm = parseFloat(msMinutes) || 0;
  
  // 小時部分：度 + 分轉度
  const hoursPart = h + hm / 60;
  
  // 分秒部分：度 + 分轉度
  const minutesSecondsPart = ms + msm / 60;
  
  // 直接相加，不需要特殊轉換
  return hoursPart + minutesSecondsPart;
};

/**
 * 度數轉弧度
 */
export const toRadians = (degrees: number): number => {
  return degrees * Math.PI / 180;
};

/**
 * 弧度轉度數
 */
export const toDegrees = (radians: number): number => {
  return radians * 180 / Math.PI;
};

/**
 * 使用指定公式計算太陽高度角和方位角（全部使用角度計算）
 * @param lat 緯度（十進制度數）
 * @param dec 赤緯（十進制度數）
 * @param t 船至太陽角度（地方時角，度數）
 */
export const calculateSunPosition = (lat: number, dec: number, t: number) => {
  // 第一個公式：cos(x) = cos(90度-緯度)*cos(90-DEC) + sin(90度-緯度)*sin(90-DEC)*cos(t)
  // 其中 cos(90-緯度) = sin(緯度), sin(90-緯度) = cos(緯度)
  // cos(90-DEC) = sin(DEC), sin(90-DEC) = cos(DEC)
  
  // 使用角度計算（轉換為弧度進行三角函數運算）
  const latRad = toRadians(lat);
  const decRad = toRadians(dec);
  const tRad = toRadians(t);
  
  const cosX = Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(tRad);
  const x = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosX)))); // 太陽高度角的餘角
  const altitude = 90 - x; // 太陽高度角
  
  // 第二個公式：cos(90-DEC) = cos(90度-緯度)*cos(x) + sin(90度-緯度)*sin(x)*cos(Az)
  // 解出 Az (方位角)
  const xRad = toRadians(x);
  const sinX = Math.sin(xRad);
  
  if (sinX === 0) {
    // 避免除以零的情況
    return { altitude, azimuth: "無法計算", azimuthFormatted: "無法計算", znAngle: 0 };
  }
  
  const cosAz = (Math.sin(decRad) - Math.sin(latRad) * cosX) / (Math.cos(latRad) * sinX);
  const azimuthAngle = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosAz))));
  
  // 格式化方位角：根據緯度和時角確定表示方式
  const isNorthernHemisphere = lat >= 0;
  const hemisphere = isNorthernHemisphere ? 'N' : 'S';
  
  // 根據時角判斷東西方向
  const isEast = t < 0; // 時角為負表示太陽在東方
  const direction = isEast ? 'E' : 'W';
  
  const azimuthFormatted = `${hemisphere} ${azimuthAngle.toFixed(1)}° ${direction}`;
  
  // 計算 Zn 角度 (從北方順時針測量的絕對方位)
  let znAngle: number;
  if (isNorthernHemisphere) {
    if (isEast) {
      znAngle = azimuthAngle;
    } else {
      znAngle = 360 - azimuthAngle;
    }
  } else {
    if (isEast) {
      znAngle = 180 - azimuthAngle;
    } else {
      znAngle = 180 + azimuthAngle;
    }
  }
  
  return { altitude, azimuth: azimuthAngle, azimuthFormatted, znAngle };
};

/**
 * 計算電羅經差
 * @param trueAzimuth 太陽真實方位角
 * @param gyroAzimuth 電羅經讀數
 */
export const calculateGyroError = (trueAzimuth: number, gyroAzimuth: number) => {
  const errorValue = trueAzimuth - gyroAzimuth;
  
  // 標準化誤差值到 -180 到 +180 範圍
  let normalizedError = errorValue;
  if (normalizedError > 180) normalizedError -= 360;
  if (normalizedError < -180) normalizedError += 360;

  // 格式化結果 - 移除正負號，只顯示絕對值和方向
  const errorDirection = normalizedError >= 0 ? 'E' : 'W';
  const absoluteError = Math.abs(normalizedError);
  const formattedError = `${absoluteError.toFixed(1)}° ${errorDirection}`;

  return { normalizedError, formattedError, absoluteError };
};
/**
 * 主要計算函數
 */
export const performCalculation = (inputData: {
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
}) => {
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
  const sunPosition = calculateSunPosition(lat, decTotalValue, t);

  // 計算電羅經差
  const gyroAz = parseFloat(inputData.gyroAzimuth);
  const gyroError = calculateGyroError(sunPosition.znAngle, gyroAz);

  return {
    gyroError: gyroError.formattedError,
    absoluteError: gyroError.absoluteError,
    trueAzimuth: sunPosition.znAngle.toFixed(1) + '°',
    calculatedT: t.toFixed(1) + '°',
    altitude: sunPosition.altitude.toFixed(1) + '°',
    azimuth: sunPosition.azimuthFormatted,
    znAngle: sunPosition.znAngle.toFixed(1) + '°',
    ghaTotal: ghaValue.toFixed(1) + '°',
    decTotal: decTotalValue.toFixed(1) + '°'
  };
};
