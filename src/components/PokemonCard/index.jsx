import { Link } from "./styles"

export const PokemonCard = ({ name }) => {
    return(
        <li>
            <Link to={`${name}`}>
                <span>{name}</span>
                <span>Ver</span>
            </Link>
        </li>
    )
}
