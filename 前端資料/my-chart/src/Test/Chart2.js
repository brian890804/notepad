import React, { useEffect, useState } from "react"
import ApexCharts from 'react-apexcharts'
import axios from "axios";
import reactDom from "react-dom";
const getTitle = "https://data.epa.gov.tw/api/v1/aqx_p_136?api_key=5c76024b-040e-40d3-bbd2-dc108d6a9b4f"

export function Chart2() {
    const [xaxis, setXaxis] = useState(null)
    const [yaxis, setYaxis] = useState(null)

    useEffect(() => {
        return axios.get(getTitle).then((response) => {
            let xaxistemp = []
            let yaxistemp = []
            let yaxistemp2=[]
            let temp = response.data.records.filter((record) => ((record.Country === "臺北市") && (record.ItemName === "雨量")) || ((record.ItemName === "一氧化碳")&&(record.Country="臺北市")))
            console.log(temp)

            temp.map((request) => {
                xaxistemp.push(request.SiteName + request.MonitorDate)
                yaxistemp.push(request.SiteId)
                yaxistemp2.push(request.Concentration)
            })
            setYaxis([{
                name: "雨量",
                data: yaxistemp,
            },
            {
                name: "濃度",
                data: yaxistemp2,
            }])

            setXaxis({
                chart: {
                    height: 300,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: "天氣報表",
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 3
                    },
                },
                xaxis: {
                    categories: xaxistemp,
                }
            })


        })


    }, [])
    return (
        <>
            {xaxis ? <ApexCharts options={xaxis} series={yaxis} /> : null}

        </>
    );
}