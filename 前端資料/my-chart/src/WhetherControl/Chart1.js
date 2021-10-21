import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts'
import * as actions from "./WhetherAction"

export function Chart1() {
    const [options, setOptions] = useState(null)
    const [series, setSeries] = useState(null)


    useEffect(() => {
        setInterval(actions.GetWhether(setOptions, setSeries), 1000)
    }, [])

    return (
        <>
            {options ?
                <ApexCharts options={options} series={series} type="line" height={350} />
                : null}
        </>
    );
}
