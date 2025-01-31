import { useEffect, useRef, useState } from "react"
import { apiUrl, PIZZA_DOUGHS, PIZZA_INGREDIENTS, PIZZA_SIZES, PIZZA_TOPPINGS } from "../constants"

const PizzaPopup = ({pizza, onClose}) => {
    const popupRef = useRef(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedDough, setSelectedDough] = useState(null)
    const [selectedToppings, setSelectedToppings] = useState([])

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose()
        }
    }

    const handleClickTopping = (topping) => {
        setSelectedToppings(prev => {
            if (prev.includes(topping.name)) {
                return prev.filter(name => name !== topping.name)
            }
            else {
                return [...prev, topping.name]
            }
        })
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="pizza-popup__overlay">
            <div className="pizza-popup__content" ref={popupRef}>
                <div className="pizza-popup__image-container">
                    <img src={`${apiUrl}${pizza.img}`} alt={pizza.name} className="pizza-popup__image"></img>
                </div>
                <div className="pizza-popup__info">
                    <h2 className="pizza-popup__name">{pizza.name}</h2>

                    <div className="pizza-popup__ingredients">
                        {buildIngredientsList(pizza)}
                    </div>

                    <div className="pizza-popup__sizes">
                        {pizza.sizes.map(size => (
                            <button 
                                type="button"
                                key={size.name}
                                className={`pizza-popup__size-btn ${selectedSize === size.name ? 'active' : ''}`}
                                onClick={() => setSelectedSize(size.name)}>
                                    {PIZZA_SIZES[size.name] || size.name}
                            </button>
                        ))}
                    </div>

                    <div className="pizza-popup__doughs">
                        {pizza.doughs.map(dough => (
                            <button
                                type="button"
                                key={dough.name}
                                className={`pizza-popup__dough-btn ${selectedDough === dough.name ? 'active' : ''}`}
                                onClick={() => setSelectedDough(dough.name)}>
                                    {PIZZA_DOUGHS[dough.name] || dough.name}
                            </button>
                        ))}
                    </div>

                    <div className="pizza-popup__toppings">
                        <p className="pizza-popup__toppings-title">Добавить по вкусу</p>

                        <div className="pizza-popup__toppings-list">
                            {pizza.toppings.map((topping) => (
                                <div
                                    key={topping.name}
                                    className={`pizza-popup__topping ${selectedToppings.includes(topping.name) ? 'active' : ''}`}
                                    onClick={() => handleClickTopping(topping)}>
                                        <img 
                                            src={`${apiUrl}${topping.img}`}
                                            alt={topping.name}
                                            className="pizza-popup__topping-image"></img>
                                        <span className="pizza-popup__topping-name">{PIZZA_TOPPINGS[topping.name] || topping.name}</span>
                                        <span className="pizza-popup__topping-price">{topping.cost}₽</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button 
                    type="button"
                    className="pizza-popup__add-btn"
                    onClick={() => alert('Added')}>Добавить в корзину</button>
            </div>
        </div>
    )
}

const buildIngredientsList = (pizza) => {
    return pizza.ingredients.map(ingredient => PIZZA_INGREDIENTS[ingredient.name] || ingredient.name).join(', ')
}

export default PizzaPopup