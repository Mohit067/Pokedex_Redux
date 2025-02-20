import { useDebounce } from '../hooks/useDebounce'
import './Search.css'

export const Search = ({updateSearchTerm}) => {

    const debouncedCallback = useDebounce((e) => updateSearchTerm(e.target.value))
    return (
        <div className="search-wrapper">
            <input 
            type="text"
            placeholder="search pokedex ...." 
            onChange={debouncedCallback}   
        />
        </div>
    )
}