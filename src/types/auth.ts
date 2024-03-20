export interface LoginResponse {
    token: string
    error: string
}

export interface RegisterResponse {
    message: string
}

export interface ProfileResponse {
    data: {
        id: string
        username: string
        about: string
    }
}
