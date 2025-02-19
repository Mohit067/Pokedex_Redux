import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './PokemonDetails.css'

export const PokemonDetail = () => {
    let {id} = useParams();
    console.log(id);

    const [pokemon, setPokemon] = useState({});

    async function downloadPokemon() {
        const response = await axios.get(`http://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);   
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        })
    }

    useEffect(() => {
        downloadPokemon();
    }, [])
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
        </div>
    );
}