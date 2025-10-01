export interface User {
    id: number;
    email: string;
    username: string;
}

export interface CreateUserDto {
    email: string;
    username: string;
    password: string;
}
