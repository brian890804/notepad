import React, { useState } from 'react'
import XLSX from "xlsx";
import InputFiles from "react-input-files";
import { saveAs } from "file-saver";
import ExportJsonExcel from "js-export-excel";
export default function Excel() {

    const [ExcelRead, setExcelRead] = useState('');
    const onImportExcel = files => {
        // 获取上传的文件对象
        // 通过FileReader对象读取文件
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = XLSX.read(result, { type: 'binary' });
                let data = []; // 存储获取到的数据
                // 遍历每张工作表进行读取（这里默认只读取第一张表）
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法将 excel 转成 json 数据
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        // break; // 如果只取第一张表，就取消注释这行
                    }
                }
                var wopts = { bookType: 'xlsx', type: 'binary' };
                var wbout = XLSX.write(workbook, wopts);

                function s2ab(s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
                setExcelRead(new Blob([s2ab(wbout)], { type: "application/octet-stream" }))
            } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                console.log('文件类型不正确');
                return;
            }
        };
        // 以二进制方式打开文件
		if((files){
			fileReader.readAsBinaryString(files[0])
		}
    }
    const DownloadExcel = () => {
        saveAs(ExcelRead, `excel - ${new Date()}.xlsx`)
    }
    return (
        <>
            <InputFiles accept=".xlsx, .xls" onChange={(file) => onImportExcel(file)}>
                <button className="btn btn-primary">Upload</button>
            </InputFiles>
            <button className="btn btn-primary" disabled={!ExcelRead} onClick={() => DownloadExcel()}>Download</button>
        </>
    )
}
