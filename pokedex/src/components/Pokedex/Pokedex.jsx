import { PokemonList } from '../PokemonList/PokemonList'
import { Searc } from '../Search/Search'
import './Pokedex.css'

export const Pokedex = () => {
    return(
        <div >
            <h1 id="pokedex-wrapper">Pokedex</h1>
            <Searc />
            <PokemonList />
        </div>
    )
}