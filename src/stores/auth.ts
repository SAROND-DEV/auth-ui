import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { LoginResponse, ProfileResponse, RegisterResponse } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
    const baseURL = new URL(import.meta.env.VITE_BACKEND_URL)
    const token = ref(localStorage.getItem('token') ?? '')
    const instanceAxios = axios.create()
    const loading = ref(false)

    const wrapperLoading = <T>(axiosFn: Promise<T>) => {
        loading.value = true
        return axiosFn.finally(() => {
            loading.value = false
        })
    }

    const signUp = (username: string, password: string) => {
        const url = new URL('/register', baseURL)
        return wrapperLoading(
            instanceAxios.post<RegisterResponse>(url.toString(), {
                username,
                password
            })
        )
    }

    const setToken = (newToken: string) => {
        token.value = newToken
        localStorage.setItem('token', newToken)
        instanceAxios.defaults.headers['Authorization'] = 'Bearer ' + token.value
    }

    const resetToken = () => setToken('')

    const signIn = async (username: string, password: string) => {
        const url = new URL('/login', baseURL)
        const response = await wrapperLoading(
            instanceAxios.post<LoginResponse>(url.toString(), {
                username,
                password
            })
        )
        setToken(response.data.token)
        return response
    }

    const getProfile = () => {
        const url = new URL('/about', baseURL)
        return wrapperLoading(instanceAxios.get<ProfileResponse>(url.toString()).then((response) => response.data))
    }

    return { token, signUp, signIn, getProfile, signOut: resetToken, loading }
})
