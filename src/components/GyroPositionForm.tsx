"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { Latitude, Longitude } from "@/packages/core-astro";

/**
 * Zod schema for GyroPositionForm
 */
export const GyroPositionFormSchema = z.object({
  latDegrees: z.string().regex(/^-?\d+$/),
  latMinutes: z.string().regex(/^\d+(\.\d+)?$/),
  latDirection: z.enum(["N", "S"]),
  lonDegrees: z.string().regex(/^-?\d+$/),
  lonMinutes: z.string().regex(/^\d+(\.\d+)?$/),
  lonDirection: z.enum(["E", "W"]),
  gyroAzimuth: z.string().regex(/^-?\d+(\.\d+)?$/),
});

/**
 * 將表單資料轉換為型別安全的 Latitude/Longitude
 */
export function parseGyroPositionForm(data: z.infer<typeof GyroPositionFormSchema>) {
  const degLat = parseFloat(data.latDegrees) || 0;
  const minLat = parseFloat(data.latMinutes) || 0;
  let lat = degLat + minLat / 60;
  if (data.latDirection === "S") lat = -lat;
  const latitude = lat as Latitude;

  const degLon = parseFloat(data.lonDegrees) || 0;
  const minLon = parseFloat(data.lonMinutes) || 0;
  let lon = degLon + minLon / 60;
  if (data.lonDirection === "W") lon = -lon;
  const longitude = lon as Longitude;

  return { latitude, longitude, gyroAzimuth: parseFloat(data.gyroAzimuth) };
}

interface GyroPositionFormProps {
  latDegrees: string;
  setLatDegrees: (value: string) => void;
  latMinutes: string;
  setLatMinutes: (value: string) => void;
  latDirection: 'N' | 'S';
  setLatDirection: (value: 'N' | 'S') => void;
  lonDegrees: string;
  setLonDegrees: (value: string) => void;
  lonMinutes: string;
  setLonMinutes: (value: string) => void;
  lonDirection: 'E' | 'W';
  setLonDirection: (value: 'E' | 'W') => void;
  gyroAzimuth: string;
  setGyroAzimuth: (value: string) => void;
}

export function GyroPositionForm(props: GyroPositionFormProps) {
  const {
    latDegrees,
    setLatDegrees,
    latMinutes,
    setLatMinutes,
    latDirection,
    setLatDirection,
    lonDegrees,
    setLonDegrees,
    lonMinutes,
    setLonMinutes,
    lonDirection,
    setLonDirection,
    gyroAzimuth,
    setGyroAzimuth,
  } = props;

  // 取得當前經緯度並填入
  function handleUseCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // 轉換為度分格式
        const latAbs = Math.abs(lat);
        const latDeg = Math.floor(latAbs);
        const latMin = ((latAbs - latDeg) * 60).toFixed(3);
        const latDir = lat >= 0 ? 'N' : 'S';

        const lonAbs = Math.abs(lon);
        const lonDeg = Math.floor(lonAbs);
        const lonMin = ((lonAbs - lonDeg) * 60).toFixed(3);
        const lonDir = lon >= 0 ? 'E' : 'W';

        setLatDegrees(latDeg.toString());
        setLatMinutes(latMin.toString());
        setLatDirection(latDir as 'N' | 'S');
        setLonDegrees(lonDeg.toString());
        setLonMinutes(lonMin.toString());
        setLonDirection(lonDir as 'E' | 'W');
      });
    } else {
      alert("瀏覽器不支援定位功能");
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <div className="flex justify-end mb-2">
        <button
          type="button"
          className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleUseCurrentLocation}
        >
          使用當前位置
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="text-base font-medium">緯度 (Latitude)</Label>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="度"
              value={latDegrees}
              onChange={(e) => setLatDegrees(e.target.value)}
              className="flex-1 min-w-0"
            />
            <Input
              placeholder="分"
              value={latMinutes}
              onChange={(e) => setLatMinutes(e.target.value)}
              className="flex-1 min-w-0"
            />
            <Select value={latDirection} onValueChange={(value: 'N' | 'S') => setLatDirection(value)}>
              <SelectTrigger className="flex-1 min-w-0">
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
              className="flex-1 min-w-0"
            />
            <Input
              placeholder="分"
              value={lonMinutes}
              onChange={(e) => setLonMinutes(e.target.value)}
              className="flex-1 min-w-0"
            />
            <Select value={lonDirection} onValueChange={(value: 'E' | 'W') => setLonDirection(value)}>
              <SelectTrigger className="flex-1 min-w-0">
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
  );
}
