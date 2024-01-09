import axios from "axios";

let url = 'http://localhost:9000';

const API = axios.create({
    baseURL: url,
});


export const postFormData = (formData) =>
    API.post("/video/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Important for FormData
        },
    });

export const getAllVideos = () =>
    API.get("/video/getVideos");
