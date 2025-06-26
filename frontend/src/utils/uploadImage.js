import { API_PATH } from "./apiPaths.js";
import axiosInstance from "./axiosInstance.js";

const uploadImage = async (imageFile) => {
    const formData = new FormData()

    formData.append('image', imageFile)

    try {
        const response = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Set header for file upload
            },
        })
        return response.data
    } catch (error) {
        console.error("Error uploading the image: ", error)
        throw error
    }
}

export default uploadImage
