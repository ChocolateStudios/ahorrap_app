export interface AuthenticatedUserResource {
    id: number;
    username: string;
    token?: string;
}