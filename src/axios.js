import axios from 'axios'
const instance = axios.create({
    baseURL:'http://localhost:5000/',
    withCredentials:true
})
instance.interceptors.request.use(config=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config}
)
export default instance;