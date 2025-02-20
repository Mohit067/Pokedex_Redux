import { useParams } from "react-router-dom"
import './PokemonDetails.css'
import { usePokemonDetail } from "../hooks/usePokemonDetail2";

export const PokemonDetail = ({ pokemonName }) => {
    let {id} = useParams();
    const [pokemon] = usePokemonDetail(id, pokemonName);

    return(
        <div className="detail">
            <div className="name-detail">name: {pokemon.name}</div>
            <img className="image-detail" src={pokemon.image} />
            <div className="height-detail">Height: {pokemon.height}</div>
            <div className="weight-detail">Weight: {pokemon.weight}</div>
            <div className="type-detail">
                {pokemon.types && 
                    pokemon.types.map((t) => <div key={t}> {t} </div>)
                }
            </div>
            {   
                pokemon.types && pokemon.similarPokemons && 
                <div className="similar-pokemon">
                    more {pokemon.types[0]} types pokemon
                    <ul >
                        {pokemon.similarPokemons.map((p) => (<li key={p.pokemon.url}>{p.pokemon.name}</li>))}
                    </ul>
                </div>
            }
            
        </div>
    );
}