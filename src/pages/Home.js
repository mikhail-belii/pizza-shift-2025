import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/AuthContext'
import PizzaCard from '../components/PizzaCard'
import PizzaPopup from '../components/PizzaPopup'
import { getPizzas } from '../fetchService'
import { apiUrl } from '../constants'

const Home = () => {
    const {isAuthorized} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [pizzas, setPizzas] = useState([])
    const [selectedPizza, setSelectedPizza] = useState(null)

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await getPizzas(`${apiUrl}/pizza/catalog`)
                if (!response.isSuccess) {
                    console.error('Catalog loading was failed')
                    return
                }
                const pizzas = response.response.catalog
                setPizzas(pizzas)
            }
            catch (err) {
                console.error('Some error occured')
            }
            finally {
                setLoading(false)
            }

        }
        fetchPizzas()

    }, [])

    const handleSelectingPizza = (pizza) => {
        setSelectedPizza(pizza)
    }

    if (loading) {
        return <div className='loading-text'>Каталог загружается...</div>
    }

    return (
        <div className='body-container'>
            <div className='pizza-grid'>
                {pizzas.map(pizza => (
                    <PizzaCard 
                        key={pizza.id}
                        name={pizza.name}
                        description={pizza.description}
                        price={getMinPizzasPrice(pizza)}
                        imageUrl={`${apiUrl}${pizza.img}`}
                        onSelect={() => handleSelectingPizza(pizza)}/>
                ))}
            </div>

            {selectedPizza && (
                <PizzaPopup pizza={selectedPizza} onClose={() => setSelectedPizza(null)}/>
            )}
        </div>
    )
}

const getMinPizzasPrice = (pizza) => {
    const sizes = pizza.sizes
    sizes.sort(comparePrice)
    return sizes[0].price || 0
}

const comparePrice = (a, b) => {
    if (a.price > b.price) {
        return 1
    }
    if (a.price < b.price) {
        return -1
    }
    return 0
}

export default Home