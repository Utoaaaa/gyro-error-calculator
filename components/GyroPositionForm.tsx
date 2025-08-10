"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  return (
    <div className="space-y-4">
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
