import instance from "./instance";

const authServices = {
    register: async (data) => {
        return await instance.post('/auth/register', data);
    },
    login: async (data) => {
        return await instance.put('/auth/login', data);
    },
    forgotPassword: async (email) => {
        return await instance.put('/auth/forgot', { email });
    },
    resetPassword: async (token, newPassword) => {
        return await instance.put(`/auth/reset/${token}`, { newPassword });
    }
}

export default authServices;
