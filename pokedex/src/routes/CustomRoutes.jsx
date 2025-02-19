import { Route, Routes } from "react-router-dom"
import { Pokedex } from "../components/Pokedex/Pokedex"
import { PokemonDetail } from "../components/PokemonDetails/PokemonDetails"

export const CustomRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Pokedex />}/>
            <Route path="/pokemon/:id" element={<PokemonDetail />}/>
        </Routes>
    )
}