import React, { useState, useMemo, useEffect } from 'react'
import ReactTable from '../../../../_metronic/partials/widgets/mytable/ReactTable'
import makeData from './makeData'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Grow from '@mui/material/Grow';
import Grid from '@mui/material/Grid';
import useStoreModal from '../../../../_metronic/alert/PromptModal'
let random = 0
function App() {
    const {myTablePrompt}=useStoreModal();
    myTablePrompt();
    const columns = useMemo(
        () => [
            {
                Header: '姓名',
                columns: [
                    {
                        Header: '姓氏',
                        accessor: 'firstName',
                    },
                    {
                        Header: '姓名',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: '資訊',
                columns: [
                    {
                        Header: '年齡',
                        accessor: 'age',
                    },
                    {
                        Header: '參訪',
                        accessor: 'visits',
                    },
                    {
                        Header: '狀態',
                        accessor: 'status',
                    },
                    {
                        Header: '進度',
                        accessor: 'progress',
                    },
                ],
            },
        ],
        []
    )
    const [title, setTitle] = useState(columns);
    const [data, setData] = useState(() => makeData(20))
    const [originalData] = useState(data)
    const [skipPageReset, setSkipPageReset] = useState(false)

    const updateMyData = (rowIndex, columnId, value) => {
        setSkipPageReset(true)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }
    useEffect(() => {
        setSkipPageReset(false)
    }, [data])
    const resetData = () => setData(originalData)
    const addData = () => {
        random = random + 1
        let newData = [...title]
        newData[1].columns.push({
            Header: 'test' + random.toString(),
            accessor: 'test' + random.toString(),
        })
        setTitle(newData)
    }
    return (
        <div className='row g-12 g-xl-12'>
            <div className='col-xl-12'>
                <div className='card card-xl-stretch mb-xl-8' style={{ minHeight: '300px' }}>
                    <div className='card-body '>
                        <Grow
                            in={true}
                            sx={{ transformOrigin: '0 0 0' }}
                            {...(true ? { timeout: 1000 } : {})}
                        >
                            <Grid container alignItems='center' justifyContent="center" sx={{ backgroundColor: '#3C3C3C', borderRadius: 2 }}>
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ margin: 5 }}><Button variant="contained" startIcon={<DeleteIcon />} onClick={resetData}>重設資料</Button></span>
                                    <span><Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => addData()}>新增欄位</Button></span>
                                </span>
                                <ReactTable
                                    columns={title}
                                    data={data}
                                    updateMyData={updateMyData}
                                    skipPageReset={skipPageReset}
                                />
                            </Grid>
                        </Grow>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
