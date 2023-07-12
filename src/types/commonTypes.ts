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
