import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://entrance-exam-portal.onrender.com',
    headers: {
       'authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance