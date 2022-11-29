import { useEffect, useState } from "react"
import { Outlet, useSearchParams } from 'react-router-dom'
import { api } from "../../services/api"
import { Button } from "../../styles/Button";
import { Container } from "../../styles/Container"
import { PokemonCard } from '../../components/PokemonCard'
import { List } from "./styles";

export const Home = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams({
        page: 0
    })

    useEffect(() => {
        async function getPokemon() {
            try {
                const response = await api.get('pokemon', {
                    params: {
                        limit: 151,
                        offset: 151 * +searchParams.get('page'),
                    }
                });

                const { results, next, previous } = response.data

                setPokemon(results)
                setIsNextDisabled(!next)
                setIsPreviousDisabled(!previous)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }

        getPokemon();
    }, [searchParams])

    return (
        <Container>
            {loading && <div>Carregando...</div>}

            <Outlet />

            <div>
                <Button 
                    onClick={() => setSearchParams({
                        page: +searchParams.get('page') - 1   
                    })}
                    disabled={isPreviousDisabled}
                >
                    Previous
                </Button>
                <Button 
                     onClick={() => setSearchParams({
                        page: +searchParams.get('page') + 1   
                    })}
                    disabled={isNextDisabled}
                >
                    Next
                </Button>
            </div>
            <List>
                {
                    pokemon.map(item => 
                        <PokemonCard key={item.name} name={item.name} />
                    )
                }
            </List>
        </Container>
    )
}