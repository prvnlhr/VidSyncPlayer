import axios from "axios";

let url = process.env.REACT_APP_BASE_URL;

const API = axios.create({
    baseURL: url,
});


export const postFormData = (formData) =>
    API.post("/video/upload", formData);

export const getAllVideos = () =>
    API.get("/video/getVideos");
