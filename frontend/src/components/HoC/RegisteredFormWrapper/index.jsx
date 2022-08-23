import React, { useState } from 'react';
import RegisteredForm from '@/components/RegisteredForm'
import { signUp } from '@/services/AuthService'
import { toast } from 'react-toastify'

function RegisteredFormWrapper() {
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        showPassword: false
    })

    const handleChange =
        (prop) => (event) => {
            setUserInfo({ ...userInfo, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setUserInfo({
            ...userInfo,
            showPassword: !userInfo.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormSubmit = async (event) => {
        try {
            const data = await signUp(userInfo)
            console.log(data)

            if (data.UserSub) {
                toast.info("註冊成功，請至您的信箱等候驗證連結")
            }
        } catch (err) {
            const errorResults = "Error" + err;
            console.log(errorResults)
        }
    }

    return <RegisteredForm
        {...userInfo}
        handleChange={handleChange}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleFormSubmit={handleFormSubmit}
    />
}

export default RegisteredFormWrapper