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
    } catch (error  :  any) {
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
    } catch (error  :  any) {
        console.log('Error at register_user : ', error.message);
    }
}