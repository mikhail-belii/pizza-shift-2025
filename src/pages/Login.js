import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IMaskInput } from 'react-imask'
import { sendOtp, signin } from '../fetchService'
import { apiUrl } from '../constants'
import { setToken } from '../tokenService'

const Login = () => {
    const {login, isAuthorized} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthorized) {
            navigate('/')
        }
    }, [isAuthorized, navigate])

    const resendTime = 120

    const [step, setStep] = useState(1)
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const [resendTimer, setResendTimer] = useState(resendTime)

    const sendOtpCode = async () => {
        try {
            const response = await sendOtp(`${apiUrl}/auth/otp`, JSON.stringify({
                "phone": phone.trim()
            }))
            if (!response.isSuccess) {
                console.log(response.response)
                return
            }
        }
        catch (err) {
            console.error('Some error occured')
        }
    }

    const handleContinue = async () => {
        if (phone.trim() !== '') {
            setStep(2)
            setResendTimer(resendTime)
            await sendOtpCode()
        }
        else {
            alert('Type your phone number')
        }
    }

    const handleLogin = async () => {
        if (code.trim() !== '') {
            try {
                const response = await signin(`${apiUrl}/users/signin`, JSON.stringify({
                    "phone": phone,
                    "code": code
                }))
                if (!response.isSuccess) {
                    console.log(response.response)
                    alert('Invalid code')
                    return
                }
                const userData = response.response
                if (userData.success) {
                    const token = userData.token
                    setToken(token)
                    login()
                    navigate('/')
                }
            }
            catch (err) {
                console.error('Some error occured')
            }
        }
        else {
            alert('Type the code')
        }
    }

    useEffect(() => {
        let intervalId
        if (step === 2 && resendTimer > 0) {
            intervalId = setInterval(() => {
                setResendTimer((prevTimer) => prevTimer - 1)
            }, 1000)
        }
        else if (resendTimer === 0) {
            clearInterval(intervalId)
        }
        return () => clearInterval(intervalId)
    }, [step, resendTimer])

    const handleResendCode = async () => {
        if (resendTimer === 0) {
            await sendOtpCode()
            setResendTimer(resendTime)
        }
    }

    return (
        <div className='body-container'>
            <h1>Авторизация</h1>

            {step === 1 && (
                <div className='auth-form'>
                    Введите номер телефона для входа в личный кабинет
                    <IMaskInput
                        type='text'
                        placeholder='+7(000)000-00-00'
                        value={phone}
                        onAccept={(value) => setPhone(value)}
                        mask={'+7(000)000-00-00'}
                        lazy={true}
                        inputMode='numeric'
                    />
                    <button onClick={handleContinue}>Продолжить</button>
                </div>
            )}

            {step === 2 && (
                <div className='auth-form'>
                    Введите проверочный код для входа в личный кабинет
                    <input
                        type="text"
                        value={phone}
                        disabled
                    />
                    <IMaskInput
                        type='text'
                        placeholder='000000'
                        value={code}
                        onAccept={(value) => setCode(value)}
                        mask={'000000'}
                        lazy={true}
                        inputMode='numeric'
                    />
                    <button onClick={handleLogin}>Войти</button>
                    {resendTimer > 0 ? (
                        <p>Запросить код повторно можно через {resendTimer} секунд</p>
                    ) : (
                        <p onClick={handleResendCode}>Запросить код ещё раз</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Login