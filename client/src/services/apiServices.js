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

        // Handle the response as needed
        console.log('Fetch Videos Response:', response.data);

        // You can also return the response if needed
        return response;
    } catch (error) {
        // Handle errors, log them, or throw them
        console.error("API request failed:", error);
    }
};