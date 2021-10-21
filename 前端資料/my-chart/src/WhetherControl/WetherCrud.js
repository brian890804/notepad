import axios from "axios";

const getTitle = "https://data.epa.gov.tw/api/v1/aqx_p_136?api_key=5c76024b-040e-40d3-bbd2-dc108d6a9b4f"


export function getWether() {
    return axios.get(getTitle);
}