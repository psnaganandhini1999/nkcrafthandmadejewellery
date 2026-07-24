import axios from "axios";
import { API, DOMAIN } from "../../helper/helper";

export const getAllCategories = async (params: any) => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get(DOMAIN + API.GET_ALL_CATEGORY, {
        params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const activeCatData = data?.categories?.filter((it: any) => it?.catStatus === "Active")
    // console.log(data);
    return activeCatData;
}