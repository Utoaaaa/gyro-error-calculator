"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { getUtcFromLocal, getGhaQueryTime } from "@/lib/timeUtils";

interface TimeInputFormProps {
  onTimeChange?: (data: TimeData) => void;
}

interface TimeData {
  localDate: string;
  localTime: string;
  timezone: string;
  utcDateTime: string;
  reductionSeconds: number;
  ghaQueryHour: number;
  ghaQueryMinute: number;
  ghaQuerySecond: number;
}

// 時區選項 (ZD格式)
const timezones = [
  { value: "+12", label: "ZD-12" },
  { value: "+11", label: "ZD-11" },
  { value: "+10", label: "ZD-10" },
  { value: "+9", label: "ZD-9" },
  { value: "+8", label: "ZD-8 (台灣)" },
  { value: "+7", label: "ZD-7" },
  { value: "+6", label: "ZD-6" },
  { value: "+5", label: "ZD-5" },
  { value: "+4", label: "ZD-4" },
  { value: "+3", label: "ZD-3" },
  { value: "+2", label: "ZD-2" },
  { value: "+1", label: "ZD-1" },
  { value: "+0", label: "ZD±0 (格林威治)" },
  { value: "-1", label: "ZD+1" },
  { value: "-2", label: "ZD+2" },
  { value: "-3", label: "ZD+3" },
  { value: "-4", label: "ZD+4" },
  { value: "-5", label: "ZD+5" },
  { value: "-6", label: "ZD+6" },
  { value: "-7", label: "ZD+7" },
  { value: "-8", label: "ZD+8" },
  { value: "-9", label: "ZD+9" },
  { value: "-10", label: "ZD+10" },
  { value: "-11", label: "ZD+11" },
  { value: "-12", label: "ZD+12" }
];

export function TimeInputForm({ onTimeChange, resetTrigger }: TimeInputFormProps & { resetTrigger?: number }) {
  const [localDate, setLocalDate] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [timezone, setTimezone] = useState("+8");
  const [utcDateTime, setUtcDateTime] = useState("");
  const [reductionSeconds, setReductionSeconds] = useState("");
  const [calculatedUtc, setCalculatedUtc] = useState("");
  const [ghaQueryTime, setGhaQueryTime] = useState("");

  // 外部重設觸發
  useEffect(() => {
    if (resetTrigger !== undefined) {
      setLocalDate("");
      setLocalTime("");
      setTimezone("+0");
      setUtcDateTime("");
      setReductionSeconds("");
      setCalculatedUtc("");
      setGhaQueryTime("");
    }
  }, [resetTrigger]);

  // 自動計算UTC時間
  useEffect(() => {
    if (localDate && localTime && timezone) {
      setCalculatedUtc(getUtcFromLocal(localDate, localTime, timezone));
    }
  }, [localDate, localTime, timezone]);

  // 計算查詢GHA的時間
  useEffect(() => {
    // 當UTC時間有輸入時，自動清除當地時間數據
    if (utcDateTime) {
      setLocalDate("");
      setLocalTime("");
      setTimezone("+8");
      setCalculatedUtc("");
    }
    const finalUtc = utcDateTime || calculatedUtc;
    if (finalUtc && reductionSeconds !== undefined) {
      const reductionSecNum = reductionSeconds === "" ? 0 : Number(reductionSeconds);
      setGhaQueryTime(getGhaQueryTime(finalUtc, reductionSecNum));
      // 回調父組件
      const adjustedTime = new Date(Date.parse(finalUtc + "Z") - (reductionSecNum * 1000));
      if (onTimeChange) {
        onTimeChange({
          localDate,
          localTime,
          timezone,
          utcDateTime: finalUtc,
          reductionSeconds: reductionSecNum,
          ghaQueryHour: adjustedTime.getUTCHours(),
          ghaQueryMinute: adjustedTime.getUTCMinutes(),
          ghaQuerySecond: adjustedTime.getUTCSeconds()
        });
      }
    }
  }, [utcDateTime, calculatedUtc, reductionSeconds]);

  // 設置當前時間 (精確到秒)
  const setCurrentTime = () => {
    const now = new Date();
    const localDateStr = now.toISOString().slice(0, 10);
    const localTimeStr = now.toTimeString().slice(0, 8); // 包含秒數 HH:MM:SS
    
    setLocalDate(localDateStr);
    setLocalTime(localTimeStr);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <div className="flex justify-between items-center">
        <Label className="text-base font-medium">時間設定</Label>
        <button
          onClick={setCurrentTime}
          className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          使用當前時間
        </button>
      </div>

      {/* 當地時間輸入 - 日期與時間合併 */}
      <div className="flex gap-4 w-full justify-center">
        <div className="flex-1 min-w-0">
          <Label className="text-sm text-gray-600">當地日期與時間</Label>
          <Input
            type="datetime-local"
            step="1"
            value={localDate && localTime ? `${localDate}T${localTime}` : ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val) {
                const [date, time] = val.split("T");
                setLocalDate(date);
                setLocalTime(time);
              } else {
                setLocalDate("");
                setLocalTime("");
              }
            }}
            placeholder="選擇當地日期與時間"
          />
        </div>
        <div className="flex-1 min-w-0">
          <Label className="text-sm text-gray-600">時區</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger className="flex-1 min-w-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 自動計算的UTC時間顯示 */}
      {calculatedUtc && (
        <div className="p-2 bg-blue-50 rounded">
          <Label className="text-sm text-blue-700">自動計算UTC時間</Label>
          <div className="text-sm font-mono text-blue-800">
            {new Date(calculatedUtc).toISOString().replace('T', ' ').slice(0, 19)} UTC
          </div>
        </div>
      )}

      {/* UTC時間與減秒 - 同一行二等分 */}
      <div className="flex gap-3 w-full">
        <div className="flex-1 min-w-0">
          <Label className="text-sm text-gray-600">UTC時間直接輸入 (可選)</Label>
          <Input
            type="datetime-local"
            step="1"
            value={utcDateTime}
            onChange={(e) => setUtcDateTime(e.target.value)}
            placeholder="如果有直接的UTC時間可在此輸入"
          />
          <div className="text-xs text-gray-500 mt-1">
            如填入此欄位，將覆蓋上方自動計算的UTC時間
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <Label className="text-sm text-gray-600">減秒秒數</Label>
          <Input
            type="number"
            value={reductionSeconds === "" ? undefined : reductionSeconds}
            onChange={(e) => setReductionSeconds(e.target.value)}
            placeholder="鐘錶誤差"
          />
          <div className="text-xs text-gray-500 mt-1">
          </div>
        </div>
      </div>

      {/* GHA查詢時間顯示 */}
      {ghaQueryTime && (
        <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
          <Label className="text-sm text-green-700 font-medium">GHA查詢時間</Label>
          <div className="text-lg font-mono text-green-800 mt-1">
            {ghaQueryTime}
          </div>
          <div className="text-xs text-green-600 mt-1">
            使用此時間查詢航海曆中的GHA值
          </div>
        </div>
      )}
    </div>
  );
}
