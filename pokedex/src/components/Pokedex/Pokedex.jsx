import { PokemonList } from '../PokemonList/PokemonList'
import { Searc } from '../Search/Search'
import './Pokedex.css'

export const Pokedex = () => {
    return(
        <div >
            <Searc />
            <PokemonList />
        </div>
    )
}