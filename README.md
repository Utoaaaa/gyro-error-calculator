# 航海電羅經差計算器 | Gyrocompass Error Calculator

一個專業的航海電羅經差計算器，使用 Next.js 15 和 Shadcn UI 構建，採用觀測太陽方位法計算電羅經差。

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-blue)
![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-Latest-purple)

## 目錄

- [專案特色](#專案特色)
- [技術棧](#技術棧)
- [功能特色](#功能特色)
- [快速開始](#快速開始)
- [部署方式](#部署方式)
- [使用說明](#使用說明)
- [計算原理](#計算原理)
- [注意事項](#注意事項)
- [專案結構](#專案結構)
- [核心文件說明](#核心文件說明)
- [測試說明](#測試說明)
- [授權](#授權)
- [貢獻](#貢獻)
- [開發者資訊](#開發者資訊)

## 🎯 專案特色

- **直觀易用**: 採用 Shadcn UI 設計的現代化界面，操作簡單直觀
- **實時計算**: 即時顯示電羅經差和相關天文參數
- **響應式設計**: 適配不同螢幕尺寸，支援行動裝置使用
- **中文界面**: 完全中文化的專業航海術語界面

## 🛠 技術棧

- **前端框架**: Next.js 15 (App Router)
- **UI 元件庫**: Shadcn UI
- **樣式框架**: Tailwind CSS v4.1
- **程式語言**: TypeScript
- **開發工具**: ESLint, PostCSS, pnpm

## 📋 功能特色

### 輸入參數
- 觀測時間（UTC）
- 船舶位置（經緯度，度/分格式）
- 觀測方位（電羅經太陽方位角）

### 計算結果
- 電羅經差（東差/西差）
- 太陽真實方位
- 地方時角 (LHA)
- 太陽赤緯 (Dec)
- 格林威治時角 (GHA)

## 🚀 快速開始

### 環境需求

- Node.js 18+
- pnpm (推薦) 或 npm
- Cloudflare 帳號（生產部署）

### 本地開發

```bash
git clone https://github.com/Utoaaaa/gyro-error-calculator.git
cd gyro-error-calculator
pnpm install
pnpm dev
```

瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 🌐 部署方式

### Cloudflare Workers 部署

1. 安裝 Wrangler CLI
2. 登錄 Cloudflare 帳號
3. 構建並部署

### 靜態網站部署

1. 構建靜態文件
2. 部署 `out` 資料夾內容至 Vercel、Netlify、GitHub Pages 等

### 本地生產環境

```bash
pnpm run build
pnpm start
```

## 📖 使用說明

1. 輸入觀測資料（日期、時間、船舶位置、太陽方位）
2. 點擊「計算電羅經差」執行計算
3. 查看結果（電羅經差、計算過程）
4. 點擊「清除重填」重新開始

## 🧮 計算原理

- 座標轉換（度/分 → 十進制度）
- 方位角轉換
- GHA、LHA 計算
- 電羅經差 = 太陽真實方位 - 電羅經太陽方位

## ⚠️ 注意事項

- 僅供航海參考，請結合多種導航設備
- 計算精度受大氣折射、觀測誤差等影響
- 建議定期校正電羅經

## 📁 專案結構

```
gyro-error-calculator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
├── src/components/             # UI 元件
│   ├── GyroActions.tsx
│   ├── GyroAlmanacForm.tsx
│   ├── GyroPositionForm.tsx
│   ├── GyroResult.tsx
│   ├── TimeInputForm.tsx
│   └── ui/                 # Shadcn UI 元件
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── select.tsx
├── src/hooks/                  # React hooks
│   └── useGyroCalculator.ts
├── src/lib/                    # 工具與核心邏輯
│   ├── calculations.ts
│   ├── calculations.test.ts
│   ├── gyroPositionSchema.ts
│   ├── timeUtils.ts
│   └── utils.ts
├── packages/
│   └── core-astro/
│       └── index.ts
├── public/                 # 靜態資源
├── scripts/
│   └── organize-assets.js
├── services/
│   └── navigation/
│       └── index.ts
├── src/
│   └── worker.ts
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── wrangler.toml
```

### 核心文件說明

- `lib/calculations.ts`：電羅經差計算核心算法
- `lib/calculations.test.ts`：單元測試
- `app/page.tsx`：主要用戶界面
- `components/ui/`：Shadcn UI 元件
- `hooks/useGyroCalculator.ts`：計算邏輯 hook
- `services/navigation/index.ts`：導航相關服務
- `packages/core-astro/index.ts`：天文計算核心
- `wrangler.toml`：Cloudflare Workers 配置
- `next.config.ts`：Next.js 配置
- `scripts/organize-assets.js`：資產組織腳本

## 🧪 測試說明

- 單元測試檔案：`lib/calculations.test.ts`
- 執行方式：
  ```bash
  pnpm test
  ```
- 測試涵蓋計算核心邏輯，確保結果正確性

## 📄 授權

MIT License

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改進這個專案。

## 👤 開發者資訊

- **開發者**: Utoa
- **版本**: 1.0.0
- **更新日期**: 2025年8月
