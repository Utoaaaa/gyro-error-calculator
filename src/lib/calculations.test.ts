// 測試 lib/calculations.ts 的 convertToDecimalDegrees

import { describe, it, expect } from 'vitest';
import {
  convertToDecimalDegrees,
  wrap360,
  wrap180,
  clampLat
} from '../packages/core-astro';
import { GyroPositionFormSchema as FormSchema, parseGyroPositionForm as parseForm } from './gyroPositionSchema';

describe('convertToDecimalDegrees', () => {
  it('正確轉換北緯', () => {
    expect(convertToDecimalDegrees('10', '30', 'N')).toBeCloseTo(10.5);
  });

  it('正確轉換南緯', () => {
    expect(convertToDecimalDegrees('10', '30', 'S')).toBeCloseTo(-10.5);
  });

  it('正確轉換東經', () => {
    expect(convertToDecimalDegrees('120', '15', 'E')).toBeCloseTo(120.25);
  });

  it('正確轉換西經', () => {
    expect(convertToDecimalDegrees('120', '15', 'W')).toBeCloseTo(-120.25);
  });

  it('度分為空字串時回傳 0', () => {
    expect(convertToDecimalDegrees('', '', 'N')).toBe(0);
    expect(convertToDecimalDegrees('', '', 'S')).toBe(0);
    expect(convertToDecimalDegrees('', '', 'E')).toBe(0);
    expect(convertToDecimalDegrees('', '', 'W')).toBe(0);
  });
});

describe('品牌型別與正規化工具', () => {
  it('wrap360 可正規化角度到 0~360', () => {
    expect(wrap360(370)).toBe(10);
    expect(wrap360(-30)).toBe(330);
  });
  it('wrap180 可正規化角度到 -180~180', () => {
    expect(wrap180(190)).toBe(-170);
    expect(wrap180(-190)).toBe(170);
  });
  it('clampLat 可限制緯度範圍', () => {
    expect(clampLat(100)).toBe(90);
    expect(clampLat(-100)).toBe(-90);
    expect(clampLat(45)).toBe(45);
  });
});

describe('GyroPositionFormSchema 與 parseGyroPositionForm', () => {
  it('表單資料可正確驗證與轉換', () => {
    const data = {
      latDegrees: '10',
      latMinutes: '30',
      latDirection: 'S',
      lonDegrees: '120',
      lonMinutes: '15',
      lonDirection: 'W',
      gyroAzimuth: '85.5'
    };
    const parsed = FormSchema.parse(data);
    const result = parseForm(parsed);
    expect(result.latitude).toBeCloseTo(-10.5);
    expect(result.longitude).toBeCloseTo(-120.25);
    expect(result.gyroAzimuth).toBeCloseTo(85.5);
  });
});
