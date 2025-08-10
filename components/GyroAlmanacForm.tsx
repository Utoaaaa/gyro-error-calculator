"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GyroAlmanacFormProps {
  ghaHours: string;
  setGhaHours: (value: string) => void;
  ghaHoursMinutes: string;
  setGhaHoursMinutes: (value: string) => void;
  ghaMinutesSeconds: string;
  setGhaMinutesSeconds: (value: string) => void;
  ghaMsMinutes: string;
  setGhaMsMinutes: (value: string) => void;
  decDegrees: string;
  setDecDegrees: (value: string) => void;
  decMinutes: string;
  setDecMinutes: (value: string) => void;
  decDirection: 'N' | 'S';
  setDecDirection: (value: 'N' | 'S') => void;
}

export function GyroAlmanacForm(props: GyroAlmanacFormProps) {
  const {
    ghaHours,
    setGhaHours,
    ghaHoursMinutes,
    setGhaHoursMinutes,
    ghaMinutesSeconds,
    setGhaMinutesSeconds,
    ghaMsMinutes,
    setGhaMsMinutes,
    decDegrees,
    setDecDegrees,
    decMinutes,
    setDecMinutes,
    decDirection,
    setDecDirection,
  } = props;

  return (
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
            className="flex-1 min-w-0"
          />
          <Input
            placeholder="分"
            value={decMinutes}
            onChange={(e) => setDecMinutes(e.target.value)}
            className="flex-1 min-w-0"
          />
          <Select value={decDirection} onValueChange={(value: 'N' | 'S') => setDecDirection(value)}>
            <SelectTrigger className="flex-1 min-w-0">
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
  );
}
