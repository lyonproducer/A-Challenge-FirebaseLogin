export interface User {
    email: string,
    fullName: string,
    birthday?: string,
    uid: string,
    completedProfile: boolean,
}

export interface UserLoginDto {
    email: string,
    password: string,
}

export interface UserRegisterDto {
    email: string,
    password: string,
    confirmPassword: string
}

export interface UserLogged {
    token?: string,
    refreshToken?: string,
    user: User 
}