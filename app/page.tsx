"use client";

import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GyroPositionForm } from "@/components/GyroPositionForm";
import { GyroAlmanacForm } from "@/components/GyroAlmanacForm";
import { GyroResult } from "@/components/GyroResult";
import { GyroActions } from "@/components/GyroActions";

import { useGyroCalculator } from "@/hooks/useGyroCalculator";

export default function GyroCalculatorPage() {
  const {
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
  } = useGyroCalculator();

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
              <GyroPositionForm
                latDegrees={latDegrees}
                setLatDegrees={setLatDegrees}
                latMinutes={latMinutes}
                setLatMinutes={setLatMinutes}
                latDirection={latDirection}
                setLatDirection={setLatDirection}
                lonDegrees={lonDegrees}
                setLonDegrees={setLonDegrees}
                lonMinutes={lonMinutes}
                setLonMinutes={setLonMinutes}
                lonDirection={lonDirection}
                setLonDirection={setLonDirection}
                gyroAzimuth={gyroAzimuth}
                setGyroAzimuth={setGyroAzimuth}
              />

              <GyroAlmanacForm
                ghaHours={ghaHours}
                setGhaHours={setGhaHours}
                ghaHoursMinutes={ghaHoursMinutes}
                setGhaHoursMinutes={setGhaHoursMinutes}
                ghaMinutesSeconds={ghaMinutesSeconds}
                setGhaMinutesSeconds={setGhaMinutesSeconds}
                ghaMsMinutes={ghaMsMinutes}
                setGhaMsMinutes={setGhaMsMinutes}
                decDegrees={decDegrees}
                setDecDegrees={setDecDegrees}
                decMinutes={decMinutes}
                setDecMinutes={setDecMinutes}
                decDirection={decDirection}
                setDecDirection={setDecDirection}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <GyroActions
              onCalculate={handleCalculate}
              onReset={handleReset}
              onLoadExample={loadExampleData}
            />
          </CardFooter>
        </Card>

        <GyroResult
          gyroError={gyroError}
          absoluteError={absoluteError}
          trueAzimuth={trueAzimuth}
          calculatedT={calculatedT}
          altitude={altitude}
          azimuth={azimuth}
          ghaTotal={ghaTotal}
          decTotal={decTotal}
        />

        {/* 免責聲明 */}
        <p className="text-xs text-gray-500 text-center mt-8 leading-relaxed">
          本計算器僅供航海參考使用。實際導航時請結合多種導航設備和方法，確保航行安全。
          本工具基於天文計算原理，但精度可能受到大氣折射、觀測誤差等因素影響。
        </p>
      </div>
    </div>
  );
}
