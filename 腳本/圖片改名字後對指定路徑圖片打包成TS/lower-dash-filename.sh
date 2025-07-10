#!/bin/bash
# 腳本功能：將指定資料夾中的檔案名稱轉換為小寫並替換空白與底線為破折號

# 設定目標資料夾路徑
TARGET_DIR="${1:-D:/demp/frontend/demp.frontend.portal.service/src/assets/map-icons}"
# 檢查資料夾是否存在
if [ ! -d "$TARGET_DIR" ]; then
    echo "錯誤: 資料夾不存在 - $TARGET_DIR"
    exit 1
fi

# 切換到目標資料夾
cd "$TARGET_DIR" || exit 1

echo "開始處理資料夾: $TARGET_DIR"
echo "=========================="

# 遍歷當前資料夾中的所有檔案
for file in *; do
    # 跳過資料夾，只處理檔案
    if [ -f "$file" ]; then
        # 將檔案名稱轉換為小寫並替換空白與底線為破折號
        new_name=$(echo "$file" | tr '[:upper:]' '[:lower:]' | tr ' _' '-')
        
        # 檢查新名稱是否與原名稱不同
        if [ "$file" != "$new_name" ]; then
            # 檢查目標檔案是否已存在 (排除只是大小寫不同的情況)
            if [ -e "$new_name" ] && [ "$file" != "$new_name" ] && [ "$(echo "$file" | tr '[:upper:]' '[:lower:]')" != "$(echo "$new_name" | tr '[:upper:]' '[:lower:]')" ]; then
                echo "警告: 目標檔案已存在，跳過 - $file -> $new_name"
            else
                # 使用臨時檔案名稱來處理大小寫重命名問題
                temp_name="temp_rename_$$_$file"
                mv "$file" "$temp_name" 2>/dev/null
                mv "$temp_name" "$new_name" 2>/dev/null
                echo "重命名: $file -> $new_name"
            fi
        else
            echo "跳過 (無需更改): $file"
        fi
    fi
done

echo "=========================="
echo "檔案重命名完成"
