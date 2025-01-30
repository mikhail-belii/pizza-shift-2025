import { useState } from "react"
import { IMaskInput } from "react-imask"

const ProfileForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')

    return (
        <div>
            <form className="credentials">
                <label htmlFor="lastName">Фамилия*</label>
                <input
                    placeholder="Иванов"
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}/>
                <label htmlFor="firstName">Имя*</label>
                <input
                    placeholder="Иван"
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}/>
                <label htmlFor="middleName">Отчество*</label>
                <input
                    placeholder="Иванович"
                    type="text"
                    id="middleName"
                    value={middleName}
                    onChange={(event) => setMiddleName(event.target.value)}/>
                <label htmlFor="phoneNumber">Телефон*</label>
                <IMaskInput
                    type='text'
                    placeholder='+7(000)000-00-00'
                    value={phoneNumber}
                    onAccept={(value) => setPhoneNumber(value)}
                    mask={'+7(000)000-00-00'}
                    lazy={true}
                    inputMode='numeric'/>
                <label htmlFor="email">Email</label>
                <input
                    placeholder="Email"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
                <label htmlFor="city">Город</label>
                <input
                    placeholder="Город"
                    type="text"
                    id="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}/>
            </form>
            <div className="profile-btns">
                <button 
                    type="button"
                    id="logout-btn">
                    Выйти
                </button>
                <button 
                    type="button"
                    id="edit-profile-btn">
                    Обновить данные
                </button>
            </div>
        </div>
    )
}

export default ProfileForm