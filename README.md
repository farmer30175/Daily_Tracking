# 喝水追蹤 (Water Tracker)

喝水、運動、飲食與久坐提醒的桌面追蹤工具，使用 Electron 開發。

## 功能

- **水**：快速記錄飲水量、自訂杯量、撤銷、每日目標與衛福部體重建議、近 7 天圖表、久坐提醒計時器
- **運動**：選擇運動類型並輸入時間，自動估算卡路里，支援刪除、運動 333 達標檢核
- **飲食**：多選餐次（早餐/午餐/晚餐/消夜/點心）、勾選食物類別自動帶入內容，可自行輸入「其他」食物，六大類均衡檢核
- **統計**：總覽卡片、逐日達成列表，以及三同心圓（喝水/運動/飲食）月曆檢視，可切換 7/30 天區間
- **多語言**：中文 / English / 日本語

## 開發

```bash
npm install
npm start          # 以 Electron 啟動開發版
```

## 打包成 EXE

```bash
npm run dist
```

產出單一 portable 執行檔：

```
dist\喝水追蹤 1.0.0.exe
```

免安裝，直接雙擊即可執行。因未做數位簽章，Windows SmartScreen 首次可能提示「未知發行者」，點「更多資訊 → 仍要執行」即可。

### 打包失敗的疑難排解

若在 Windows 上遇到 `winCodeSign` 解壓失敗（`Cannot create symbolic link`，通常是因未開啟管理員/開發人員模式而無法建立 macOS 的 symlink）：

1. 手動將已下載解壓的 `winCodeSign` 內容放到：
   `%LOCALAPPDATA%\electron-builder\Cache\winCodeSign\winCodeSign-2.6.0`
2. 再以 `CSC_IDENTITY_AUTO_DISCOVERY=false npm run dist` 執行打包

## 資料儲存位置

紀錄存放在使用者本機，不會因為關閉程式而消失：

```
%APPDATA%\喝水追蹤
```

- 資料與「電腦」綁定：把 exe 複製到其他電腦不會帶走歷史紀錄
- 若要移機，請一併複製 `%APPDATA%\喝水追蹤` 資料夾

## 專案結構

```
app.js      前端邏輯（紀錄、統計、月曆、計時器）
index.html  頁面結構
style.css   樣式
main.js     Electron 主程序
server.js   其他伺服器/輔助程式
package.json 專案設定與打包設定
```
