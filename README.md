# 航海電羅經差計算器 | Gyrocompass Error Calculator

一個專業的航海電羅經差計算器，使用 Next.js 15 和 Shadcn UI 構建，採用觀測太陽方位法計算電羅經差。

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-blue)
![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-Latest-purple)

## 🎯 專案特色

- **專業精準**: 基於天文計算原理，使用 SunCalc 庫進行精確的太陽位置計算
- **直觀易用**: 採用 Shadcn UI 設計的現代化界面，操作簡單直觀
- **實時計算**: 即時顯示電羅經差和相關天文參數
- **響應式設計**: 適配不同螢幕尺寸，支援行動裝置使用
- **中文界面**: 完全中文化的專業航海術語界面

## 🛠 技術棧

- **前端框架**: Next.js 15 (App Router)
- **UI 元件庫**: Shadcn UI
- **樣式框架**: Tailwind CSS v4.1
- **程式語言**: TypeScript
- **天文計算**: SunCalc
- **開發工具**: ESLint, PostCSS

## 📋 功能特色

### 輸入參數
- **觀測時間**: UTC 日期和時間選擇
- **船舶位置**: 精確的經緯度輸入（度/分格式）
- **觀測方位**: 電羅經太陽方位角

### 計算結果
- **電羅經差**: 主要計算結果，顯示東差(E)或西差(W)
- **太陽真實方位**: 基於天文計算的太陽真實方位角
- **地方時角 (LHA)**: Local Hour Angle
- **太陽赤緯 (Dec)**: 太陽赤緯角
- **格林威治時角 (GHA)**: Greenwich Hour Angle

## 🚀 快速開始

### 環境需求

- Node.js 18+ 
- pnpm (推薦) 或 npm
- Cloudflare 帳號 (用於生產部署)

### 本地開發

#### 1. 克隆專案

```bash
git clone https://github.com/Utoaaaa/gyro-error-calculator.git
cd gyro-error-calculator
```

#### 2. 安裝依賴

```bash
# 推薦使用 pnpm
pnpm install

# 或使用 npm
npm install
```

#### 3. 啟動開發伺服器

```bash
pnpm dev
# 或
npm run dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 生產環境部署

#### 方式一：Cloudflare Workers 部署 (推薦)

1. **安裝 Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **登錄 Cloudflare 帳號**
   ```bash
   wrangler login
   ```

3. **構建並部署**
   ```bash
   # 安裝依賴並構建專案
   pnpm install
   
   # 構建用於 Cloudflare Workers 的版本
   pnpm run build:cf
   
   # 部署到 Cloudflare Workers
   pnpm run deploy
   ```

4. **訪問部署的應用**
   - 默認域名：`https://gyro-error-calculator.your-subdomain.workers.dev`
   - 自定義域名：`https://6156150.xyz/gyro-error-calculator`

#### 方式二：靜態網站部署

1. **構建靜態文件**
   ```bash
   pnpm install
   pnpm run build
   ```

2. **部署到靜態主機**
   - 將 `out` 資料夾中的內容上傳到任何靜態主機服務
   - 支援 Vercel、Netlify、GitHub Pages 等平台

#### 方式三：本地生產環境

```bash
# 構建專案
pnpm run build

# 啟動生產服務器
pnpm start
```

### 開發指令說明

```bash
# 開發模式 (使用 Turbopack 加速)
pnpm dev

# 構建生產版本
pnpm run build

# 構建 Cloudflare Workers 版本
pnpm run build:cf

# 組織資產文件 (用於 Cloudflare)
pnpm run organize-assets

# 啟動生產服務器
pnpm start

# 代碼檢查
pnpm run lint

# Cloudflare Workers 本地開發
pnpm run cf:dev

# 部署到 Cloudflare Workers
pnpm run deploy
```

## 📖 使用說明

### 1. 輸入觀測資料

1. **選擇觀測日期**: 使用日曆選擇器選擇觀測的 UTC 日期
2. **輸入觀測時間**: 分別輸入時、分、秒（UTC 時間）
3. **輸入船舶位置**:
   - 緯度：輸入度數和分數，選擇北(N)或南(S)
   - 經度：輸入度數和分數，選擇東(E)或西(W)
4. **輸入電羅經太陽方位**: 輸入電羅經觀測到的太陽方位角（度）

### 2. 執行計算

點擊「計算電羅經差」按鈕執行計算

### 3. 查看結果

- **電羅經差**: 主要結果，正值顯示為綠色(東差)，負值顯示為紅色(西差)
- **計算過程備查**: 顯示中間計算參數供驗證使用

### 4. 重新計算

點擊「清除重填」按鈕清除所有輸入並重新開始

## 🧮 計算原理

本計算器採用以下步驟計算電羅經差：

1. **座標轉換**: 將度/分格式轉換為十進制度數
2. **天文計算**: 使用 SunCalc 庫計算太陽位置
3. **方位角轉換**: 將太陽方位角轉換為航海標準方位
4. **GHA 計算**: 計算格林威治時角
5. **LHA 計算**: 計算地方時角 (LHA = GHA + 經度)
6. **電羅經差**: 計算真實方位與電羅經方位的差值

公式：**電羅經差 = 太陽真實方位 - 電羅經太陽方位**

## ⚠️ 注意事項

- 本計算器僅供航海參考使用
- 實際導航時請結合多種導航設備和方法
- 計算精度可能受到大氣折射、觀測誤差等因素影響
- 建議定期進行電羅經校正和比對

## 📁 專案結構

```
gyro-error-calculator/
├── app/                    # Next.js App Router
│   ├── favicon.ico        # 網站圖標
│   ├── globals.css        # 全局樣式
│   ├── layout.tsx         # 根佈局
│   └── page.tsx           # 主頁面
├── components/            # UI 元件
│   └── ui/               # Shadcn UI 元件
│       ├── button.tsx    # 按鈕元件
│       ├── calendar.tsx  # 日曆選擇器
│       ├── card.tsx      # 卡片元件
│       ├── input.tsx     # 輸入框元件
│       ├── label.tsx     # 標籤元件
│       ├── select.tsx    # 下拉選擇元件
│       └── tooltip.tsx   # 提示框元件
├── lib/                   # 工具函數和核心邏輯
│   ├── calculations.ts   # 電羅經差計算核心邏輯
│   └── utils.ts         # 通用工具函數
├── public/               # 靜態資源
│   ├── file.svg         # SVG 圖標
│   ├── globe.svg        # 地球圖標
│   ├── next.svg         # Next.js 圖標
│   ├── vercel.svg       # Vercel 圖標
│   └── window.svg       # 視窗圖標
├── scripts/              # 構建腳本
│   └── organize-assets.js # Cloudflare Workers 資產組織腳本
├── src/                  # Cloudflare Workers
│   └── worker.ts        # Workers 入口點
├── .gitignore           # Git 忽略文件
├── components.json      # Shadcn UI 配置
├── eslint.config.mjs    # ESLint 配置
├── next.config.ts       # Next.js 配置
├── package.json         # 依賴配置
├── pnpm-lock.yaml       # pnpm 鎖定文件
├── postcss.config.mjs   # PostCSS 配置
├── README.md            # 專案說明文件
├── tsconfig.json        # TypeScript 配置
└── wrangler.toml        # Cloudflare Workers 配置
```

### 核心文件說明

- **`lib/calculations.ts`**: 包含電羅經差計算的核心算法
- **`app/page.tsx`**: 主要的用戶界面和交互邏輯
- **`components/ui/`**: 基於 Shadcn UI 的可重用 UI 元件
- **`wrangler.toml`**: Cloudflare Workers 部署配置
- **`next.config.ts`**: Next.js 配置，支援靜態導出和 Cloudflare Workers
- **`scripts/organize-assets.js`**: 構建時組織資產文件的腳本

## 📄 授權

MIT License

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改進這個專案。

---

**開發者**: 航海電羅經差計算器團隊  
**版本**: 1.0.0  
**更新日期**: 2025年8月
