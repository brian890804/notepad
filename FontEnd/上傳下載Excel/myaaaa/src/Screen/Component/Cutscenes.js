import React, { useRef, useEffect } from 'react'
import * as echarts from 'echarts';
const options=require('./CutscenesOption.json')
export default function Cutscenes() {
    const chartRef = useRef()
    let myChart = null
    function renderChart() {
        myChart = echarts.init(chartRef.current)
        myChart.setOption(options)
    }
    useEffect(() => {
        renderChart()
        return () => {
             myChart?.dispose()
        }
    })
    return (
        <>
            <div ref={chartRef} id="main" style={{ minHeight: '100vh', textAlign: 'center', display: 'flex', justifyContent: 'center',backgroundColor:'#FFEEDD' }} />
        </>
    )
}