import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DataTable({ Rows }) {
    if (Rows) {
        return (
            <TableContainer component={Paper} elevation={3} style={{ maxHeight: 400, borderTopLeftRadius: 0, minWidth: 600, overflowY: 'scroll' }} >
                <Table >
                    <TableBody style={{ backgroundColor: '#272727' }}>
                        {Rows.map((row, index) => (
                            <TableRow
                                key={index}
                                style={{ color: 'white', backgroundColor: index % 2 === 0 ? '#272727' : '#3C3C3C' }}
                            >  
                                {
                                    row.map((col, index) => {
                                        return <TableCell key={index} style={{ color: 'white' }}>{col}</TableCell>
                                    })
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    } return null
}