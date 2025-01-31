import { useContext, useEffect, useState } from "react"
import { IMaskInput } from "react-imask"
import { editProfile, getProfile } from "../fetchService"
import { apiUrl } from "../constants"
import { AuthContext } from "./AuthContext"
import { setToken } from "../tokenService"
import questionMark from "../img/question-mark.svg"

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        city: ''
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

    const {logout} = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProfile(`${apiUrl}/users/session`)
                if (!response.isSuccess) {
                    setError('Profile loading was failed')
                    return
                }
                const firstName = response.response.user.firstname
                const lastName = response.response.user.lastname
                const middleName = response.response.user.middlename
                const phone = response.response.user.phone
                const email = response.response.user.email
                const city = response.response.user.city

                setFormData({
                    firstName: firstName || '',
                    lastName: lastName || '',
                    middleName: middleName || '',
                    phone: phone || '',
                    email: email || '',
                    city: city || ''
                })
            }
            catch (err) {
                console.error('Some error occured while loading data')
                setError('Some error occured while loading data')
            }
            finally {
                setLoading(false)
            }
            
        }
        fetchData()
    }, [])

    if (loading) {
        return <div className='loading-text'>Данные профиля загружаются...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    const handleUpdate = async () => {
        if (formData.lastName === '' || formData.firstName === '' || formData.middleName === '' || formData.phone === '') {
            alert('Fill the required fields with <*>')
            return
        }
        try {
            const data = {
                "profile": {
                    "firstname": formData.firstName,
                    "middlename": formData.middleName,
                    "lastname": formData.lastName,
                    "email": formData.email,
                    "city": formData.city
                },
                "phone": formData.phone
            }
            const response = await editProfile(`${apiUrl}/users/profile`, JSON.stringify(data))
            if (!response.isSuccess) {
                alert('Failed while modifying profile')
                return
            }
            alert('Profile was modified')
        }
        catch (err) {
            console.error('Unplanned error')
        }
    }

    const handleLogout = () => {
        logout()
        setToken('')
        setIsLogoutModalOpen(false)
    }

    return (
        <div>
            <h1>Профиль</h1>
            <form className="credentials">
                <label htmlFor="lastName">Фамилия*</label>
                <input
                    placeholder="Иванов"
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(event) => setFormData(prev => ({...prev, lastName: event.target.value}))}/>
                <label htmlFor="firstName">Имя*</label>
                <input
                    placeholder="Иван"
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(event) => setFormData(prev => ({...prev, firstName: event.target.value}))}/>
                <label htmlFor="middleName">Отчество*</label>
                <input
                    placeholder="Иванович"
                    type="text"
                    id="middleName"
                    value={formData.middleName}
                    onChange={(event) => setFormData(prev => ({...prev, middleName: event.target.value}))}/>
                <label htmlFor="phoneNumber">Телефон*</label>
                <IMaskInput
                    type='text'
                    placeholder='+7(000)000-00-00'
                    value={formData.phone}
                    onAccept={(value) => setFormData(prev => ({...prev, phone: value}))}
                    mask={'+7(000)000-00-00'}
                    lazy={true}
                    inputMode='numeric'/>
                <label htmlFor="email">Email</label>
                <input
                    placeholder="Email"
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={(event) => setFormData(prev => ({...prev, email: event.target.value}))}/>
                <label htmlFor="city">Город</label>
                <input
                    placeholder="Город"
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(event) => setFormData(prev => ({...prev, city: event.target.value}))}/>
            </form>
            <div className="profile-btns">
                <button 
                    type="button"
                    id="logout-btn"
                    onClick={() => setIsLogoutModalOpen(true)}>
                    Выйти
                </button>
                <button 
                    type="button"
                    id="edit-profile-btn"
                    onClick={handleUpdate}>
                    Обновить данные
                </button>
            </div>
            {isLogoutModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <img src={questionMark} alt="question-mark" id="question-mark"></img>
                        <p>Вы точно хотите выйти?</p>
                        <div className="modal-btns">
                            <button 
                                className="cancel-btn"
                                onClick={() => setIsLogoutModalOpen(false)}>
                                Отменить
                            </button>
                            <button 
                                className="confirm-btn"
                                onClick={handleLogout}>
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileForm