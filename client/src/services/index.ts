export const login_user = async (formData: unknown) => {
    try {
        const res = await fetch('http://localhost:8000/api/login-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log('Error at login_user: ', error.message);
    }


}

export const register_user = async (formData: unknown) => {
    try {
        const res = await fetch('http://localhost:8000/api/register-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log('Error at register_user : ', error.message);
    }
}


export const get_all_users = async (id: unknown) => {
    try {
        const res = await fetch(`http://localhost:8000/api/get-all-users?id=${id}`, {
            method: 'GET',
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log('Error at get_all_users (services) : ', error.message);
    }
}


export const getChatData = async (data: any) => {
    const { senderId, receiverId } = data;
    try {
        const res = await fetch(`http://localhost:8000/api/get-user-chat?senderId=${senderId}&receiverId=${receiverId}`, {
            method: 'GET',
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log('Error at get_all_users (services) : ', error.message);
    }
}
export const getGroupChatData = async (data: any) => {
    const { senderId, receiverId } = data;
    console.log('senderId : ', senderId, 'receiverId : ', receiverId)
    try {
        const res = await fetch(`http://localhost:8000/api/get-group-chat?senderId=${senderId}&receiverId=${receiverId}`, {
            method: 'GET',
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log('Error at get_all_users (services) : ', error.message);
    }
}


export const send_message = async (formData: any) => {

    try {
        const res = await fetch(`http://localhost:8000/api/send-user-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log('Error at send message (services) : ', error.message);
    }
}



export const create_group  =  async (formData: any) => {
    try {
        const res = await fetch(`http://localhost:8000/api/create-group`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log('Error at create group (services) : ', error.message);
    }
}


export const get_user_group  = async (id: any) => {
    try {
        const res = await fetch(`http://localhost:8000/api/get-user-group?id=${id}`, {
            method: 'GET',
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log('Error at get_user_group (services) : ', error.message);
    }
}


export const send_group_message = async (formData: any) => {
    
        try {
            const res = await fetch(`http://localhost:8000/api/send-group-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            return data;
        } catch (error: any) {
            console.log('Error at send_group_message (services) : ', error.message);
        }
}