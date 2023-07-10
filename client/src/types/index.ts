export type LoginFormValues = {
    password: string;
    email: string;
};


export type RegisterFormValues = {
    name: string;
    phone: string;
    password: string;
    email: string;
};


export interface userState {
    token: string;
    user: userData | null;
}

interface userData {
    email: string;
    name: string;
    phone: string;
}


export interface chatState {
    chatSelected: boolean;
}