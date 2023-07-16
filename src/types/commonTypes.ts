export type ApiException = {
    statusCode: number,
    message: string,
}

export type Note = {
    id: number;
    title: string;
    content?: string;
    userId: number,
}

export type AuthRes = {
    token: string,
    tokenType: string
}

export type User = {
    email: string,
}
