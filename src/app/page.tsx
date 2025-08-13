"use client";

import { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GyroPositionForm } from "@/components/GyroPositionForm";
import { GyroAlmanacForm } from "@/components/GyroAlmanacForm";
import { TimeInputForm } from "@/components/TimeInputForm";
import { GyroResult } from "@/components/GyroResult";
import { GyroActions } from "@/components/GyroActions";
import { useGyroCalculator } from "@/hooks/useGyroCalculator";
import { useGyroAstronomyEngineCalculator } from "@/hooks/useGyroAstronomyEngineCalculator";

export default function GyroCalculatorPage() {
  // tab 狀態：'almanac' 或 'astronomy'
  const [tab, setTab] = useState<'almanac' | 'astronomy'>('almanac');

  // 航海曆查詢 hook
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

  // Astronomy Engine 計算 hook
  const astro = useGyroAstronomyEngineCalculator();

  // 新增resetTrigger狀態
  const [resetTrigger, setResetTrigger] = useState(0);

  // 新增赤緯修正狀態
  const [decCorrection, setDecCorrection] = useState("");

  // 包裝原本的handleReset
  const handleResetAll = () => {
    handleReset();
    setResetTrigger((v) => v + 1);
    setDecCorrection("");
  };

  // Astronomy Engine reset
  const handleAstroResetAll = () => {
    astro.handleReset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 標題 */}
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">航海電羅經差計算器</h1>
          <p className="text-lg text-gray-600">觀測太陽方位法計算電羅經差</p>
        </div>

        {/* tab 切換 */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${tab === 'almanac' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('almanac')}
          >
            航海曆查詢
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${tab === 'astronomy' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('astronomy')}
          >
            Astronomy Engine 計算
          </button>
        </div>

        {/* 資料輸入卡片 */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">觀測資料輸入</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {tab === 'almanac' ? (
                <>
                  <TimeInputForm
                    onTimeChange={(timeData) => {
                      console.log('時間資料更新:', timeData);
                    }}
                    resetTrigger={resetTrigger}
                  />
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
                    decCorrection={decCorrection}
                    setDecCorrection={setDecCorrection}
                  />
                </>
              ) : (
                <>
                  <TimeInputForm
                    onTimeChange={(timeData) => {
                      let iso = "";
                      if (timeData.utcDateTime) {
                        iso = timeData.utcDateTime.endsWith("Z")
                          ? timeData.utcDateTime
                          : timeData.utcDateTime + "Z";
                        astro.setUtcDateTime(timeData.utcDateTime);
                      }
                      astro.setUtcIsoString(iso);
                      if (typeof timeData.reductionSeconds === "number") {
                        astro.setReductionSeconds(timeData.reductionSeconds.toString());
                      }
                      if (timeData.ghaQueryHour !== undefined && timeData.ghaQueryMinute !== undefined && timeData.ghaQuerySecond !== undefined) {
                        const pad = (n: number) => String(n).padStart(2, "0");
                        const ghaQueryTime = `${iso.slice(0, 11)}${pad(timeData.ghaQueryHour)}:${pad(timeData.ghaQueryMinute)}:${pad(timeData.ghaQuerySecond)}Z`;
                        astro.setGhaQueryTime(ghaQueryTime);
                      }
                    }}
                    resetTrigger={0}
                    reductionSeconds={astro.reductionSeconds}
                    setReductionSeconds={astro.setReductionSeconds}
                    utcDateTime={astro.utcDateTime}
                    setUtcDateTime={astro.setUtcDateTime}
                  />
                  <GyroPositionForm
                    latDegrees={astro.latDegrees}
                    setLatDegrees={astro.setLatDegrees}
                    latMinutes={astro.latMinutes}
                    setLatMinutes={astro.setLatMinutes}
                    latDirection={astro.latDirection}
                    setLatDirection={astro.setLatDirection}
                    lonDegrees={astro.lonDegrees}
                    setLonDegrees={astro.setLonDegrees}
                    lonMinutes={astro.lonMinutes}
                    setLonMinutes={astro.setLonMinutes}
                    lonDirection={astro.lonDirection}
                    setLonDirection={astro.setLonDirection}
                    gyroAzimuth={astro.gyroAzimuth}
                    setGyroAzimuth={astro.setGyroAzimuth}
                  />
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            {tab === 'almanac' ? (
              <GyroActions
                onCalculate={handleCalculate}
                onReset={handleResetAll}
                onLoadExample={loadExampleData}
              />
            ) : (
              <GyroActions
                onCalculate={astro.handleCalculate}
                onReset={handleAstroResetAll}
                onLoadExample={astro.loadExampleData}
              />
            )}
          </CardFooter>
        </Card>

        <GyroResult
          gyroError={tab === 'almanac' ? gyroError : astro.gyroError}
          absoluteError={tab === 'almanac' ? absoluteError : astro.absoluteError}
          trueAzimuth={tab === 'almanac' ? trueAzimuth : astro.trueAzimuth}
          calculatedT={tab === 'almanac' ? calculatedT : astro.calculatedT}
          altitude={tab === 'almanac' ? altitude : astro.altitude}
          azimuth={tab === 'almanac' ? azimuth : astro.azimuth}
          ghaTotal={tab === 'almanac' ? ghaTotal : astro.ghaTotal}
          decTotal={tab === 'almanac' ? decTotal : astro.decTotal}
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
