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

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 建置專案

```bash
npm run build
```

### 啟動生產環境

```bash
npm start
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
│   ├── globals.css        # 全局樣式
│   ├── layout.tsx         # 根佈局
│   └── page.tsx           # 主頁面
├── components/            # UI 元件
│   └── ui/               # Shadcn UI 元件
├── lib/                   # 工具函數
├── public/               # 靜態資源
└── package.json          # 依賴配置
```

## 📄 授權

MIT License

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改進這個專案。

---

**開發者**: 航海電羅經差計算器團隊  
**版本**: 1.0.0  
**更新日期**: 2025年1月
