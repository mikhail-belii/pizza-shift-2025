const PizzaCard = ({imageUrl, name, description, price, onSelect}) => {
    return (
        <div className="pizza-card">
            <img className="pizza-card__image" src={imageUrl} alt={name}></img>
            <div className="pizza-card__name">{name}</div>
            <div className="pizza-card__description">{description}</div>
            <div className="pizza-card__price">от {price}₽</div>
            <button type="button" className="pizza-card__select-btn" onClick={onSelect}>Выбрать</button>
        </div>
    )
}

export default PizzaCard