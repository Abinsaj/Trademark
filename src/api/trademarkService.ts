import axiosInstance from "../config/axiosInstance"
import { FiltersType } from "../interfaces/homeInterface"


export const getTradeMarkList = async(query: string, filters:FiltersType): Promise<any>=>{
    try {
        const payload = {
            input_query: query,
            input_query_type: filters.input_query_type || "",
            sort_by: "default",
            status: [],
            exact_match: false,
            date_query:  false,
            owners: filters.owners || [],
            attorneys: filters.attorneys || [],
            law_firms: filters.law_firms || [],
            mark_description_description: filters.mark_description_description || [],
            classes: filters.classes || [],
            page: filters.page || 1,
            rows: filters.rows || 10,
            sort_order: filters.sort_order || "desc",
            states: filters.states || [],
            counties: filters.counties || []
          };

          console.log(payload,'this is the payload')
        const response = await axiosInstance.post("",payload,{
            headers: {
                "Content-Type": "application/json"
              }
        })
        return response.data
    } catch (error: any) {
        console.error("Error fetching trademark List",error)
        if(error.response && error.response.data){
            return error.response.data
        }
        return { success: false, message: "An error occurred while fetching trademark data." };
    }
}