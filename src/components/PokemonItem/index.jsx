import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Container } from "./styles";

export const PokemonItem = () => {
    const [currentPokemon, setCurrentPokemon] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        async function getPokemonData() {
            const response = await api.get(`/pokemon/${name}`);
    
            setCurrentPokemon(response.data);
        }

        getPokemonData();
    }, [name])


    if(!currentPokemon) {
        return null;
    }

    return (
        <Container>
            <img src={currentPokemon.sprites.front_default} alt={currentPokemon.name} />
            <span>{currentPokemon.name}</span>
        </Container>
    )
}