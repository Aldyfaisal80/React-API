import axios from 'axios'

const axiosIntence = axios.create({
    baseURL: 'http://localhost:3010',
})

export default axiosIntence