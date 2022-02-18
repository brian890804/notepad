import React, { useState, useEffect } from 'react'
import { useTable, usePagination } from 'react-table'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
}) => {
    const [value, setValue] = useState(initialValue)
    const onChange = e => {
        setValue(e.target.value)
    }
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    return <input value={value} onChange={onChange} onBlur={onBlur} style={{
        background: '#272727',
        border: 0,
        color: 'white'
    }} />
}
const defaultColumn = {
    Cell: EditableCell,
}

export default function ReactTable({ columns, data, updateMyData, skipPageReset }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            autoResetPage: !skipPageReset,
            updateMyData,
        },
        usePagination
    )
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table"{...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()} >
                                {
                                    headerGroup.headers.length === 2
                                        ?
                                        headerGroup.headers.map(column => (
                                            <TableCell {...column.getHeaderProps()}
                                                sx={{
                                                    textAlign: 'center',
                                                    backgroundColor: '#272727',
                                                    color: 'white',
                                                    fontWeight: 800,
                                                    fontSize: 20,
                                                }}>
                                                {column.render('Header')}
                                            </TableCell>
                                        ))
                                        :
                                        headerGroup.headers.map(column => (
                                            <TableCell {...column.getHeaderProps()}
                                                sx={{
                                                    textAlign: 'left',
                                                    backgroundColor: '#272727',
                                                    color: 'white'
                                                }}>
                                                {column.render('Header')}
                                            </TableCell>
                                        ))}
                            </TableRow>
                        ))}
                    </TableHead>

                    <TableBody {...getTableBodyProps()} sx={{ backgroundColor: '#272727' }}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0, } }}
                                    {...row.getRowProps()}>
                                    {row.cells.map((cell, index) =>
                                        <TableCell key={index} scope="row" sx={{
                                            textAlign: 'left',
                                            color: 'white'
                                        }} {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                    )}
                                </TableRow>

                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="pagination pt-5">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}