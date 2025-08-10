import { useState } from "react";
import { performCalculation } from "@/lib/calculations";

export function useGyroCalculator() {
  // 緯度狀態
  const [latDegrees, setLatDegrees] = useState('');
  const [latMinutes, setLatMinutes] = useState('');
  const [latDirection, setLatDirection] = useState<'N' | 'S'>('N');
  
  // 經度狀態
  const [lonDegrees, setLonDegrees] = useState('');
  const [lonMinutes, setLonMinutes] = useState('');
  const [lonDirection, setLonDirection] = useState<'E' | 'W'>('E');
  
  // 觀測方位
  const [gyroAzimuth, setGyroAzimuth] = useState('');
  
  // GHA手動輸入狀態 - 詳細分組
  const [ghaHours, setGhaHours] = useState('');
  const [ghaHoursMinutes, setGhaHoursMinutes] = useState('');
  const [ghaMinutesSeconds, setGhaMinutesSeconds] = useState('');
  const [ghaMsMinutes, setGhaMsMinutes] = useState('');
  
  // DEC手動輸入狀態
  const [decDegrees, setDecDegrees] = useState('');
  const [decMinutes, setDecMinutes] = useState('');
  const [decDirection, setDecDirection] = useState<'N' | 'S'>('N');
  
  // 結果狀態
  const [gyroError, setGyroError] = useState<string | null>(null);
  const [absoluteError, setAbsoluteError] = useState<number>(0);
  const [trueAzimuth, setTrueAzimuth] = useState<string | null>(null);
  const [calculatedT, setCalculatedT] = useState<string | null>(null);
  const [altitude, setAltitude] = useState<string | null>(null);
  const [azimuth, setAzimuth] = useState<string | null>(null);
  const [ghaTotal, setGhaTotal] = useState<string | null>(null);
  const [decTotal, setDecTotal] = useState<string | null>(null);

  // 主要計算函數
  const handleCalculate = () => {
    try {
      if (!latDegrees || !latMinutes || !lonDegrees || !lonMinutes || 
          !ghaHours || !ghaHoursMinutes || !ghaMinutesSeconds || !ghaMsMinutes ||
          !decDegrees || !decMinutes || !gyroAzimuth) {
        alert('請填寫所有必要欄位');
        return;
      }

      const inputData = {
        latDegrees,
        latMinutes,
        latDirection,
        lonDegrees,
        lonMinutes,
        lonDirection,
        ghaHours,
        ghaHoursMinutes,
        ghaMinutesSeconds,
        ghaMsMinutes,
        decDegrees,
        decMinutes,
        decDirection,
        gyroAzimuth
      };

      const results = performCalculation(inputData);

      setGyroError(results.gyroError);
      setAbsoluteError(results.absoluteError);
      setTrueAzimuth(results.trueAzimuth);
      setCalculatedT(results.calculatedT);
      setAltitude(results.altitude);
      setAzimuth(results.azimuth);
      setGhaTotal(results.ghaTotal);
      setDecTotal(results.decTotal);

    } catch (error) {
      console.error('計算錯誤:', error);
      alert('計算過程中發生錯誤，請檢查輸入資料');
    }
  };

  // 重置函數
  const handleReset = () => {
    setLatDegrees('');
    setLatMinutes('');
    setLatDirection('N');
    setLonDegrees('');
    setLonMinutes('');
    setLonDirection('E');
    setGhaHours('');
    setGhaHoursMinutes('');
    setGhaMinutesSeconds('');
    setGhaMsMinutes('');
    setDecDegrees('');
    setDecMinutes('');
    setDecDirection('N');
    setGyroAzimuth('');
    setGyroError(null);
    setAbsoluteError(0);
    setTrueAzimuth(null);
    setCalculatedT(null);
    setAltitude(null);
    setAzimuth(null);
    setGhaTotal(null);
    setDecTotal(null);
  };

  // 載入示例資料
  const loadExampleData = () => {
    setLatDegrees('31');
    setLatMinutes('25');
    setLatDirection('N');
    setLonDegrees('132');
    setLonMinutes('3.1');
    setLonDirection('E');
    setGhaHours('283');
    setGhaHoursMinutes('50.3');
    setGhaMinutesSeconds('3');
    setGhaMsMinutes('41.5');
    setDecDegrees('22');
    setDecMinutes('45.1');
    setDecDirection('N');
    setGyroAzimuth('276.5');
  };

  return {
    latDegrees, setLatDegrees,
    latMinutes, setLatMinutes,
    latDirection, setLatDirection,
    lonDegrees, setLonDegrees,
    lonMinutes, setLonMinutes,
    lonDirection, setLonDirection,
    gyroAzimuth, setGyroAzimuth,
    ghaHours, setGhaHours,
    ghaHoursMinutes, setGhaHoursMinutes,
    ghaMinutesSeconds, setGhaMinutesSeconds,
    ghaMsMinutes, setGhaMsMinutes,
    decDegrees, setDecDegrees,
    decMinutes, setDecMinutes,
    decDirection, setDecDirection,
    gyroError, absoluteError, trueAzimuth, calculatedT, altitude, azimuth, ghaTotal, decTotal,
    handleCalculate, handleReset, loadExampleData
  };
}
