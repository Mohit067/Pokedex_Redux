import axios from "axios";
import { useEffect, useState } from "react"

export const usePokemonList = () => {
    const [pokemonListState, setPokemonListState] = useState({
            pokemonList: [],
            isLoading: true,
            pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
            prevUrl: '',
            nextUrl: ''
    });

    async function downloadPokemons() {

        setPokemonListState((state) => ({...state, isLoading: true}));
        const response = await axios.get(pokemonListState.pokedexUrl);

        const pokemonResults = response.data.results;
        console.log(pokemonListState);
        
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

        setPokemonListState((state) => ({
            ...state, 
            pokemonList: pokeListResult, 
            isLoading: false
        }));
    }
        

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl] );


    return [pokemonListState, setPokemonListState];
}