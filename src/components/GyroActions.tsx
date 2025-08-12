"use client";

import { Button } from "@/components/ui/button";

interface GyroActionsProps {
  onCalculate: () => void;
  onReset: () => void;
  onLoadExample: () => void;
}

export function GyroActions(props: GyroActionsProps) {
  const { onCalculate, onReset, onLoadExample } = props;

  return (
    <div className="flex gap-4 w-full justify-center">
      <Button onClick={onCalculate} className="flex-1 min-w-0">
        計算電羅經差
      </Button>
      <Button variant="outline" onClick={onReset} className="flex-1 min-w-0">
        清除重填
      </Button>
      <Button variant="secondary" onClick={onLoadExample} className="flex-1 min-w-0">
        載入示例
      </Button>
    </div>
  );
}
