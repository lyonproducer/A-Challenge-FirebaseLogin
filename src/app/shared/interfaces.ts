export interface User {
    email: string,
    fullName: string,
    birthday?: string,
    uid: string,
    completedProfile: boolean,
}

export interface Truck {
    date: string,
    id: string,
    latitude: number,
    longitude: number,
    name: string,
    show: boolean,
    time: string
}

export interface TruckJson {
    Date: string,
    id: number,
    Latitude: number,
    Longitude: number,
    VehicleID: number,
    Time: string
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