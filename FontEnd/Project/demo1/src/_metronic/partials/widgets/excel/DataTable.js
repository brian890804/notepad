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
            <TableContainer component={Paper} elevation={3} style={{ maxHeight: 350, borderTopLeftRadius: 0, minWidth: 600, overflowY: 'scroll' }} >
                <Table aria-label="simple table">
                    <TableBody style={{ backgroundColor: '#272727' }}>
                        {Rows.map((row, index) => (
                            <TableRow
                                key={index}
                                style={{ color: 'white', backgroundColor: index % 2 === 0 ? '#272727' : '#3C3C3C' }}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ color: 'white' }}>
                                    {row[0]}
                                </TableCell>
                                {
                                    row.map((row, index) => {
                                        if (index > 0) {
                                            return (
                                                <TableCell align="right" key={index} style={{ color: 'white'}}>{row}</TableCell>
                                            )
                                        }return null
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