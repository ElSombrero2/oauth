

export type CreateUserDto = {
    username: string,
    email: string,
    password: string,
}

export type CreateUserOauth2Dto = {
    username: string,
    email: string,
    password?: string,
    type?: string,
    picture?: string
}