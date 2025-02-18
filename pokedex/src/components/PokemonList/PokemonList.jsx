import axios from "axios";
import { useEffect, useState } from "react"
import './PokemonList.css'
import { Pokemon } from "../Pokemon/Pokemon";

export const PokemonList = () => {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const POKEDEX_URL = 'http://pokeapi.co/api/v2/pokemon';

    async function downloadPokemons() {
        const response = await axios.get(POKEDEX_URL);
        const pokemonResults = response.data.results;
        const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultsPromise);
        console.log(pokemonData);

        const pokeListResult = pokemonData.map((pokeDate) => {
            const pokemon = pokeDate.data;
            return{
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                type: pokemon.type
            }
        })
        console.log(pokeListResult);
        setPokemonList(pokeListResult);
        setIsLoading(false);

    }

    useEffect(() => {
        downloadPokemons();
    }, [])
    return(
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            {(isLoading) ? 'Loading...' : 
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
            }
        </div>
    )
}