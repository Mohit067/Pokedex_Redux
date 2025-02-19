import axios from "axios";
import { useEffect, useState } from "react"
import './PokemonList.css'
import { Pokemon } from "../Pokemon/Pokemon";

export const PokemonList = () => {

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const [pokedexUrl, setPokedexUrl]= useState('http://pokeapi.co/api/v2/pokemon');

    // const [prevUrl, setPrevUrl] = useState('');
    // const [nextUrl, setNextUrl] = useState('');

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'http://pokeapi.co/api/v2/pokemon',
        prevUrl: '',
        nextUrl: ''
    })

    async function downloadPokemons() {
        setPokemonListState((state) => ({...state, isLoading: true}));
        const response = await axios.get(pokemonListState.pokedexUrl);
        const pokemonResults = response.data.results;
        setPokemonListState((state) => ({
            ...state, 
            prevUrl: response.data.previous, 
            nextUrl: response.data.next
        }));

        const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultsPromise);
        console.log(pokemonData);

        const pokeListResult = pokemonData.map((pokeDate) => {
            const pokemon = pokeDate.data;
            return{
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types,
            }
        })
        console.log(pokeListResult);

        setPokemonListState((state) => ({
            ...state, 
            pokemonList: pokeListResult, 
            isLoading: false
        }));

    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl])
    return(
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            <div className="pokemon-wrapper">
                {(pokemonListState.isLoading) ? 'Loading...' : 
                    pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
                }
            </div>
            <div className="controls">
                <button disabled={pokemonListState.prevUrl == undefined} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.prevUrl})}>Prev</button>
                <button disabled={pokemonListState.nextUrl == undefined} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.nextUrl})}>Next</button>
            </div>
        </div>
    )
}