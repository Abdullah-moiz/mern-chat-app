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

export interface userData {
    email: string;
    name: string;
    phone: string;
    _id: string;
}


export interface chatState {
    chatSelected: boolean;
    allUsers: userData[];
    receiverSelected: receiverSelected | null;
    messages: message[];
}

export interface receiverSelected{
    email: string;
    name: string;
    _id: string;
}





export interface message {
    _id: string;
    sender: string;
    receiver: string;
    message: string;
}