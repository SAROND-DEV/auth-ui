import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
    const baseURL = new URL('http://localhost:8081')
    const token = ref('')

    const signUp = (username: string, password: string) => {
        const url = new URL('/register', baseURL)
        return axios.post(url.toString(), {
            username,
            password
        })
    }

    const signIn = async (username: string, password: string) => {
        const url = new URL('/login', baseURL)
        const response = await axios.post(url.toString(), {
            username,
            password
        })
        token.value = response.data.token
        axios.defaults.headers['Authorization'] = 'Bearer ' + token.value
        return response
    }

    const getProfile = () => {
        const url = new URL('/about', baseURL)
        return axios.get(url.toString()).then((response) => response.data)
    }

    const signOut = () => {
        token.value = ''
        axios.defaults.headers['Authorization'] = token.value
    }

    return { token, signUp, signIn, getProfile, signOut }
})
