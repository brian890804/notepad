import * as echarts from 'echarts';
const options = require('./CutscenesOption.json')
export default function Cutscenes() {
    let myChart = echarts.init(document.getElementById('splash-screen'))
    myChart.setOption(options)
}