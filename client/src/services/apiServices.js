import axios from "axios";
import * as api from "./api/index"
export const uploadFormData = async (formData) => {
    try {
        const res = await api.postFormData(formData);
        console.log(res);
    } catch (error) {
        console.error("API request failed:", error);
    }
};


export const fetchVideos = async () => {
    try {
        const response = await api.getAllVideos();
        console.log('Fetch Videos Response:', response.data);
        return response;
    } catch (error) {
        console.error("API request failed:", error);
    }
};