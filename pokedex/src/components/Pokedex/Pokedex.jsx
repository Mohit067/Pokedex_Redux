import { useState } from 'react';
import { PokemonList } from '../PokemonList/PokemonList'
import { Search } from '../Search/Search'
import './Pokedex.css'
import { PokemonDetail } from '../PokemonDetails/PokemonDetails';

export const Pokedex = () => {

    const [searchTerm, setSearchTerm] = useState('');

    return(
        <div >
            <Search updateSearchTerm={setSearchTerm}/>
            
            {(!searchTerm) ? <PokemonList /> : <PokemonDetail key={searchTerm} pokemonName={searchTerm}/>}
        </div>
    )
}