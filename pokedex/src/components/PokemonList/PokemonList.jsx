import axios from "axios";
import { useEffect, useState } from "react"
import './PokemonList.css'
import { Pokemon } from "../Pokemon/Pokemon";

export const PokemonList = () => {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [pokedexUrl, setPokedexUrl]= useState('http://pokeapi.co/api/v2/pokemon');

    const [prevUrl, setPrevUrl] = useState('');
    const [nextUrl, setNextUrl] = useState('');

    async function downloadPokemons() {
        setIsLoading(true);
        const response = await axios.get(pokedexUrl);
        const pokemonResults = response.data.results;
        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next);

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
    }, [pokedexUrl])
    return(
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            <div className="pokemon-wrapper">
                {(isLoading) ? 'Loading...' : 
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
                }
            </div>
            <div className="controls">
                <button disabled={prevUrl == undefined} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled={nextUrl == undefined} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
    )
}