import React, {useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import members from "./Buycar.json"
let rows = []
members.map((member, index) => { rows.push({ id: index, Product: member.Product, Content: member.Content, count: member.count }) })
console.log(rows)
const columns = [

    {
        field: 'id', headerName: 'ID', width: 150, editable: true,

    },
    {
        field: 'Product', headerName: 'Product', width: 150, editable: true,
    },
    {
        field: 'Content',
        headerName: 'Content',
        width: 150,
        editable: true,
    },
    {
        field: 'count',
        headerName: 'count',
        width: 150,
        editable: true,
    },
];




export default function Table() {
    const [time, setTime] = useState();
    setInterval(() => { setTime(new Date().toLocaleTimeString()) }, 1000)
    const hadleChange = (e) => {
        rows = rows.map((row) => {
            if (row.id === e.id) {
                console.log("進來")
                switch (e.field) {
                    case "count":
                        row.count = +e.props.value
                        break;
                    default:
                        break;
                }
                return row
            }
            return row
        })
    }
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                onEditCellChangeCommitted={(e) => { hadleChange(e) }}
            />
            {time}
        </div>

    );
}
