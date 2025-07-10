import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 取得 __dirname，ES Module 下的寫法
const __filename = fileURLToPath(new URL(".", import.meta.url));
const __dirname = path.dirname(__filename);

// 1. 你的 SVG 資料夾路徑（相對於此腳本）
const iconsDir = path.resolve(__dirname, "src/assets/icons"); // 請確認路徑是否正確，去掉 ~

// 2. 輸出檔案路徑（你希望放在哪）
const outputFile = path.resolve(__dirname, "src/constants/icons.ts"); // 同上，去掉 ~

// 3. 將檔名轉成 PascalCase + Icon 的函數
function toPascalCase(str: string): string {
  return (
    str
      .split(/[-_]/g)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("") + "Icon"
  );
}

// 4. 掃描資料夾並過濾 svg 檔案
const files = fs.readdirSync(iconsDir).filter((file) => file.endsWith(".svg"));

// 5. 產生匯入字串和名稱清單
const imports = files
  .map((file) => {
    const baseName = file.replace(".svg", "");
    const iconName = toPascalCase(baseName);
    return `import ${iconName} from "../assets/icons/${file}";`; // 注意路徑相對性要依實際調整
  })
  .join("\n");

const exportNames = files
  .map((file) => toPascalCase(file.replace(".svg", "")))
  .join(",\n  ");

const typeKeys = files
  .map((file) => `"${toPascalCase(file.replace(".svg", ""))}"`)
  .join(" |\n  ");

const content = `// 此檔案由 generate-icons.ts 自動生成，請勿手動修改

${imports}

export const IconMap = {
  ${exportNames}
} as const;

export type IconKey = ${typeKeys};
`;

fs.writeFileSync(outputFile, content, "utf-8");

console.log("icons.ts 產生完成，共", files.length, "個 icons");
