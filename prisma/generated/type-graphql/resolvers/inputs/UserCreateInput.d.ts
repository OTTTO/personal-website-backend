export declare class UserCreateInput {
    id?: string | undefined;
    createdAt?: Date | undefined;
    email: string;
    role?: "USER" | "ADMIN" | undefined;
}
