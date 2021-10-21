import * as reqeustFromServer from "./WetherCrud"

export function GetWhether(setOptions, setSeries) {
    reqeustFromServer.getWether().then((response)=> {
        let temp = response.data.records.filter((record) => record.SiteName === "士林" && record.ItemName === "一氧化碳");
        let seriesDataTemp = []
        let optionsXaxisTemp = []
        temp.map((data) => {
            seriesDataTemp.push(data.Concentration)
            optionsXaxisTemp.push(data.MonitorDate)
        })

        setSeries([{
            name: "濃度",
            data: seriesDataTemp
        }])

        setOptions({
            title: {
                text: "一氧化碳報表",
                align: 'left'
            },
            xaxis: {
                categories: optionsXaxisTemp,
            }
        })
    })
}