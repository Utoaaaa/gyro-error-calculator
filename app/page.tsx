"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { performCalculation } from "@/lib/calculations";

export default function GyroCalculatorPage() {
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
      // 資料驗證
      if (!latDegrees || !latMinutes || !lonDegrees || !lonMinutes || 
          !ghaHours || !ghaHoursMinutes || !ghaMinutesSeconds || !ghaMsMinutes ||
          !decDegrees || !decMinutes || !gyroAzimuth) {
        alert('請填寫所有必要欄位');
        return;
      }

      // 準備輸入資料
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

      // 執行計算
      const results = performCalculation(inputData);

      // 更新狀態
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 標題 */}
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">航海電羅經差計算器</h1>
          <p className="text-lg text-gray-600">觀測太陽方位法計算電羅經差</p>
        </div>

        {/* 資料輸入卡片 */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">觀測資料輸入</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {/* 船舶位置與觀測方位 - 移到最上面 */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-medium">緯度 (Latitude)</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="度"
                        value={latDegrees}
                        onChange={(e) => setLatDegrees(e.target.value)}
                      />
                      <Input
                        placeholder="分"
                        value={latMinutes}
                        onChange={(e) => setLatMinutes(e.target.value)}
                      />
                      <Select value={latDirection} onValueChange={(value: 'N' | 'S') => setLatDirection(value)}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="N">北 (N)</SelectItem>
                          <SelectItem value="S">南 (S)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">經度 (Longitude)</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="度"
                        value={lonDegrees}
                        onChange={(e) => setLonDegrees(e.target.value)}
                      />
                      <Input
                        placeholder="分"
                        value={lonMinutes}
                        onChange={(e) => setLonMinutes(e.target.value)}
                      />
                      <Select value={lonDirection} onValueChange={(value: 'E' | 'W') => setLonDirection(value)}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="E">東 (E)</SelectItem>
                          <SelectItem value="W">西 (W)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* 觀測方位 */}
                <div>
                  <Label htmlFor="gyro-azimuth" className="text-base font-medium">
                    電羅經太陽方位 (°)
                  </Label>
                  <Input
                    id="gyro-azimuth"
                    placeholder="例如: 85.5"
                    value={gyroAzimuth}
                    onChange={(e) => setGyroAzimuth(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* 航海曆資料輸入 - 移到下面 */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">格林威治時角 (GHA) - 航海曆查詢</Label>
                  <div className="space-y-3 mt-2">
                    {/* 小時部分 */}
                    <div>
                      <Label className="text-sm text-gray-600 block mb-1">小時部分</Label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label className="text-xs text-gray-500">度 (°)</Label>
                          <Input
                            type="number"
                            placeholder="15"
                            value={ghaHours}
                            onChange={(e) => setGhaHours(e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <Label className="text-xs text-gray-500">分</Label>
                          <Input
                            type="number"
                            placeholder="45"
                            min="0"
                            max="59"
                            value={ghaHoursMinutes}
                            onChange={(e) => setGhaHoursMinutes(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* 分秒部分 */}
                    <div>
                      <Label className="text-sm text-gray-600 block mb-1">分秒部分</Label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label className="text-xs text-gray-500">度 (°)</Label>
                          <Input
                            type="number"
                            placeholder="30"
                            step="0.1"
                            value={ghaMinutesSeconds}
                            onChange={(e) => setGhaMinutesSeconds(e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <Label className="text-xs text-gray-500">分</Label>
                          <Input
                            type="number"
                            placeholder="25"
                            step="0.1"
                            value={ghaMsMinutes}
                            onChange={(e) => setGhaMsMinutes(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    從航海曆查詢 GHA 值：小時部分+ 分秒部分
                  </div>
                </div>
                
                <div>
                  <Label className="text-base font-medium">太陽赤緯 (Declination) - 航海曆查詢</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="度"
                      value={decDegrees}
                      onChange={(e) => setDecDegrees(e.target.value)}
                    />
                    <Input
                      placeholder="分"
                      value={decMinutes}
                      onChange={(e) => setDecMinutes(e.target.value)}
                    />
                    <Select value={decDirection} onValueChange={(value: 'N' | 'S') => setDecDirection(value)}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="N">北 (N)</SelectItem>
                        <SelectItem value="S">南 (S)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    從航海曆查詢太陽赤緯值
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button size="lg" onClick={handleCalculate} className="flex-1">
              計算電羅經差
            </Button>
            <Button variant="outline" onClick={handleReset} className="flex-1">
              清除重填
            </Button>
            <Button variant="secondary" onClick={loadExampleData} className="flex-1">
              載入示例
            </Button>
          </CardFooter>
        </Card>

        {/* 結果顯示卡片 */}
        {gyroError && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">計算結果</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 最終結果 */}
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Label className="text-lg font-medium text-gray-700">電羅經差 (Gyro Error)</Label>
                  <div className={`text-3xl font-bold mt-2 ${
                    absoluteError <= 0.5 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {gyroError}
                  </div>
                </div>

                {/* 計算過程備查 */}
                <div>
                  <Label className="text-base font-medium mb-4 block">計算過程備查</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <Label className="font-medium">太陽真實方位 (Zn):</Label>
                      <span className="font-mono">{trueAzimuth}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <Label className="font-medium">船至太陽角度 (t):</Label>
                      <span className="font-mono">{calculatedT}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <Label className="font-medium">太陽高度角 (Hc):</Label>
                      <span className="font-mono">{altitude}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <Label className="font-medium">方位角 (Az):</Label>
                      <span className="font-mono">{azimuth}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <Label className="font-medium">GHA:</Label>
                      <span className="font-mono">{ghaTotal}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <Label className="font-medium">DEC:</Label>
                      <span className="font-mono">{decTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 免責聲明 */}
        <p className="text-xs text-gray-500 text-center mt-8 leading-relaxed">
          本計算器僅供航海參考使用。實際導航時請結合多種導航設備和方法，確保航行安全。
          本工具基於天文計算原理，但精度可能受到大氣折射、觀測誤差等因素影響。
        </p>
      </div>
    </div>
  );
}
