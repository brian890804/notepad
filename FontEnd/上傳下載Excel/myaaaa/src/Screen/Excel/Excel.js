import React, { useState,useEffect } from 'react'
import XLSX from "xlsx";
import InputFiles from "react-input-files";
import { saveAs } from "file-saver";
import { ExcelRenderer } from 'react-excel-renderer';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import PromptModal from '../Component/PromptModal'
import NavigationIcon from '@mui/icons-material/Navigation';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Grow from '@mui/material/Grow';
import { makeStyles } from '@material-ui/styles';
import DataTable from './Components/DataTable';
import Tooltip from '@mui/material/Tooltip';
export default function Excel() {
    const classes = useStyles();
    const [ExcelRead, setExcelRead] = useState('');
    const [Rows, setRows] = useState();
    const [Alert, setAlert] = useState({ title: 'Excel上傳、預覽、下載頁面，請上傳Excel', type: 'success' });
    const DownloadExcel = () => {
        saveAs(ExcelRead, `excel - ${new Date()}.xlsx`)
    }
    // useEffect(()=>{
    //         if(ExcelRead&&!Rows){
    //             setAlert({ title: '上傳內容錯誤請上傳文字檔案', type: 'error' })
    //         }
    //         console.log(ExcelRead,Rows,'s')
    // },[ExcelRead],[Rows])
    return (
        <div className={classes.root}>
            <PromptModal request={Alert} />
            <Container maxWidth="lg" component="main" sx={{ margin: 5 }} >
                <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 1000 } : {})}
                >
                    <Grid container alignItems='center' justifyContent="center" style={{ backgroundColor: '#3C3C3C', borderRadius: 10 }}>
                        <Grid item xs={12} sx={{ p: 2, textAlign: 'left' }}  >
                            <InputFiles accept=".xlsx, .xls" onChange={(files) => { onImportExcel({ files, Rows, setRows, setExcelRead, setAlert }); setAlert('');console.log(files[0],'filesfiles') }}>
                                <Tooltip title={"上傳檔案"} >
                                    <NavigationIcon fontSize="large" style={{ cursor: 'pointer' }} color='primary' />
                                </Tooltip>
                            </InputFiles>
                            <Tooltip title={Rows ? "下載檔案" : "請先上傳檔案"}  >
                                <span style={{ marginLeft: 20 }} onClick={() => Rows ? DownloadExcel() : setAlert({ title: '請先點選左側藍色上傳檔案鈕', type: 'error' })}>
                                    <FileDownloadIcon fontSize="large" style={{ cursor: Rows ? 'pointer' : '' }} color={Rows && 'success'} />
                                </span>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <DataTable Rows={Rows} />
                        </Grid>
                        {Rows && <Grid item xs={12} sx={{ p: 3 }} />}
                    </Grid>
                </Grow>
            </Container >
        </div >
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
    ExcelRenderer(files[0], (err, resp) => {
        if (resp.rows) {
            setRows(resp.rows)
        } else {
        }
    });
    fileReader.onload = event => {
        const { result } = event.target;
        const workbook = XLSX.read(result, { type: 'binary' });
        let data = [];
        for (const sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
                data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            }
        }
        var wopts = { bookType: 'xlsx', type: 'binary' };
        var wbout = XLSX.write(workbook, wopts);
        setExcelRead(new Blob([s2ab(wbout)], { type: "application/octet-stream" }))
    };

}

const useStyles = makeStyles({
    root: { backgroundColor: 'grey', minHeight: '100vh', textAlign: 'center', display: 'flex', justifyContent: 'center' }
});