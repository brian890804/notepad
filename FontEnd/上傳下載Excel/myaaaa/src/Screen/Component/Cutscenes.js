import React, { useRef,useEffect } from 'react'
import * as echarts from 'echarts';

export default function Cutscenes() {
    const chartRef = useRef()
    let myChart = null
    const options = {
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                        text: 'Another Testing',
                        fontSize: 80,
                        fontWeight: 'bold',
                        lineDash: [0, 200],
                        lineDashOffset: 0,
                        fill: 'transparent',
                        stroke: '#000',
                        lineWidth: 1
                    },
                    keyframeAnimation: {
                        duration: 3000,
                        loop: true,
                        keyframes: [
                            {
                                percent: 0.7,
                                style: {
                                    fill: 'transparent',
                                    lineDashOffset: 200,
                                    lineDash: [200, 0]
                                }
                            },
                            {
                                // Stop for a while.
                                percent: 0.8,
                                style: {
                                    fill: 'transparent'
                                }
                            },
                            {
                                percent: 1,
                                style: {
                                    fill: 'black'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };
    function renderChart() {
        const chart = echarts.getInstanceByDom(chartRef.current)
        if (chart) {
            myChart = chart
        } else {
            myChart = echarts.init(chartRef.current)
        }
        myChart.setOption(options)
    }
    React.useEffect(() => {
        renderChart()
        return () => {
            myChart && myChart.dispose()
        }
    })
    return (
        <>
            <div ref={chartRef} id="main" style={
                {
                    width: '800px',
                    height: '400px',
                    marginLeft: 200
                }
            } />
        </>
    )
}