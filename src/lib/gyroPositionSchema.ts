import { z } from "zod";
import { Latitude, Longitude } from "../../packages/core-astro";

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
