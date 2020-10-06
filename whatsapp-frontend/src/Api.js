import axios from 'axios'

const instance = axios.create({
    baseURL:"https://whatsup-backend.herokuapp.com"
})

export default instance