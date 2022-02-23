import React, { useState } from 'react'
import XLSX from "xlsx";
import InputFiles from "react-input-files";
import { saveAs } from "file-saver";
import Grid from '@mui/material/Grid';
import NavigationIcon from '@mui/icons-material/Navigation';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Grow from '@mui/material/Grow';
import DataTable from '../../../../_metronic/partials/widgets/excel/DataTable';
import Tooltip from '@mui/material/Tooltip';
import useStoreModal from '../../../../_metronic/alert/PromptModal'
export default function Excel() {
    const [ExcelRead, setExcelRead] = useState('');
    const [Rows, setRows] = useState();
    const { excelPrompt, excelUploadPrompt,excelUploadSuccessPrompt } = useStoreModal();
    const DownloadExcel = () => {
        saveAs(ExcelRead, `excel - ${new Date()}.xlsx`)
    }
    React.useEffect(() => {
        excelPrompt();
    }, [])//eslint-disable-line
    return (
        <div className='row g-12 g-xl-12'>
            <div className='col-xl-12'>
                <div className='card card-xl-stretch mb-xl-8' style={{ minHeight: '300px' }}>
                    <div className='card-body '>
                        <Grow
                            in={true}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(true ? { timeout: 1000 } : {})}
                        >
                            <Grid container alignItems='center' justifyContent="center" sx={{ backgroundColor: '#3C3C3C', borderRadius: 2 }}>
                                <Grid item xs={12} sx={{ p: 2, textAlign: 'left' }}  >
                                    <InputFiles accept=".xlsx, .xls" onChange={(files) => { onImportExcel({ files, Rows, setRows, setExcelRead});excelUploadSuccessPrompt() }}>
                                        <Tooltip title={"上傳檔案"} >
                                            <NavigationIcon fontSize="large" style={{ cursor: 'pointer' }} color='primary' />
                                        </Tooltip>
                                    </InputFiles>
                                    <Tooltip title={Rows ? "下載檔案" : "請先上傳檔案"}  >
                                        <span style={{ marginLeft: 20 }} onClick={() => Rows ? DownloadExcel() : excelUploadPrompt()}>
                                            <FileDownloadIcon fontSize="large" sx={{ cursor: Rows ? 'pointer' : '' }} color={Rows && 'success'} />
                                        </span>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    <DataTable Rows={Rows} />
                                </Grid>
                                {Rows && <Grid item xs={12} sx={{ p: 3 }} />}
                            </Grid>
                        </Grow>
                    </div>
                </div>
            </div >
        </div>
    )
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function onImportExcel({ files, setRows, setExcelRead }) {
    const fileReader = new FileReader();
    fileReader.onload = event => {
        const { result } = event.target;
        let workbook = XLSX.read(result, { type: 'array', sheetStubs: true });//解析文件成陣列
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        setRows(data);
        workbook = XLSX.read(result, { type: 'binary' });//解析文件
        var wopts = { bookType: 'xlsx', type: 'binary' };
        var wbout = XLSX.write(workbook, wopts);//重新寫入為工作表
        setExcelRead(new Blob([s2ab(wbout)], { type: "application/octet-stream" }))
    };
    fileReader.readAsArrayBuffer(files[0]);
}
