import './Pokemon.css'
export const Pokemon = ({name, image}) => {
    return(
        <div className='pokemon'>
            <div><img src={image}/></div>
            <div>{name}</div>
        </div>
    )
}