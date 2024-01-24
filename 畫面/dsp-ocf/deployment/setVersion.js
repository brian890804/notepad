/**
 * 此腳本用於修改 版本日期
 * 目標修改兩處
 * (1) env.production
 * (2) package.json
 */

const fs = require('fs');
const dayjs = require('dayjs');

/** ------- (1) 變更 env.production ------- */
// 讀取檔案內容
const filePath = './.env.production';
const fileContent = fs.readFileSync(filePath, 'utf-8');

// 生成 timestamp
const timestamp = dayjs().format('YYYYMMDD-HHmmss');

// 解析檔案內容，假設每一行都是以換行符分隔的鍵值對
const lines = fileContent.split('\n');
let updatedContent = '';

// 遍歷每一行
// eslint-disable-next-line no-restricted-syntax
for (const line of lines) {
	// 檢查是否為 VITE_APP_VERSION 行
	if (line.startsWith('VITE_APP_VERSION=')) {
		// 取得當前版本號
		const currentVersion = line.split('=')[1].trim();

		// 更新版本號，你可以自行定義更新邏輯
		const updatedVersion = `${currentVersion}-${timestamp}`;

		// 更新行內容
		updatedContent += `VITE_APP_VERSION=${updatedVersion}\n`;
	} else {
		// 其他行保持原樣
		updatedContent += `${line}\n`;
	}
}

// 寫回檔案 (env.production)
fs.writeFileSync(filePath, updatedContent, 'utf-8');

/** ------- (2) 變更 package.json ------- */
const packageJson = require('../package.json');
// 將時間戳記添加到版本號中
packageJson.version = `${packageJson.version}-${timestamp}`;
// 寫入更新後的(package.json)
fs.writeFileSync('./src/assets/package.json', JSON.stringify(packageJson, null, '\t'));
