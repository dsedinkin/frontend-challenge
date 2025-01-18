export type TRequest = (params: { path: string, body?: string, method: string }) => Promise<any>;
