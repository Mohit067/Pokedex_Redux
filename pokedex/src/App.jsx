import { Link } from 'react-router-dom'
import './App.css'
import { CustomRoutes } from './routes/CustomRoutes'
import '../src/components/Pokedex/Pokedex.css'
function App() {

  return (
    <div>
      <h1 id="pokedex-wrapper">
        <Link to="/"> Pokedex</Link>
      </h1>
      <CustomRoutes />
    </div>
  )
}

export default App
