const fs = require('fs');
const path = require('path');

// 創建 gyro-error-calculator 子目錄
const outDir = path.join(__dirname, '..', 'out');
const subDir = path.join(outDir, 'gyro-error-calculator');

// 如果子目錄不存在，創建它
if (!fs.existsSync(subDir)) {
  fs.mkdirSync(subDir, { recursive: true });
}

// 獲取 out 目錄中的所有文件和文件夾（除了 gyro-error-calculator）
const items = fs.readdirSync(outDir).filter(item => item !== 'gyro-error-calculator');

// 移動所有文件到子目錄
items.forEach(item => {
  const srcPath = path.join(outDir, item);
  const destPath = path.join(subDir, item);
  
  try {
    if (fs.existsSync(destPath)) {
      fs.rmSync(destPath, { recursive: true, force: true });
    }
    fs.renameSync(srcPath, destPath);
  } catch (error) {
    console.error(`Error moving ${item}:`, error.message);
  }
});

console.log('Assets organized successfully!');
