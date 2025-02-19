import { Link } from 'react-router-dom'
import './Pokemon.css'
export const Pokemon = ({name, image, id}) => {
    return(
        <Link to={`/pokemon/${id}`} className='pokemon'>
            <div >   
                        <div><img src={image}/></div>
                        <div>{name}</div>
            </div>
        </Link>
    )
}