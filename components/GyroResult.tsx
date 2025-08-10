"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface GyroResultProps {
  gyroError: string | null;
  absoluteError: number;
  trueAzimuth: string | null;
  calculatedT: string | null;
  altitude: string | null;
  azimuth: string | null;
  ghaTotal: string | null;
  decTotal: string | null;
}

export function GyroResult(props: GyroResultProps) {
  const {
    gyroError,
    absoluteError,
    trueAzimuth,
    calculatedT,
    altitude,
    azimuth,
    ghaTotal,
    decTotal,
  } = props;

  if (!gyroError) return null;

  return (
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
  );
}
