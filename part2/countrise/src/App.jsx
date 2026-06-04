import { useState, useEffect } from 'react'
import countriseService from './services/countrise'
import Filter from './components/Filter'


const App = () => {
  const[countrise, setCountries] = useState([])
  const[search, setSearch] = useState('')
  

  useEffect(() => {
    countriseService
      .getAll()
      .then(data=>setCountries(data))

  },[])

  const countriesToFind = search === ''
  ? countrise
  : countrise.filter(country=>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )


  const handleChangeSearch=(event)=> setSearch(event.target.value)
  
  
  return (
    <div>
      <Filter value={search} onChange={handleChangeSearch}></Filter>

      {search !=='' &&(
        countriesToFind.length > 10
        ? <p>Too many matches, specify another filter</p>
        : countriesToFind.length === 1 
          ? <div>
            <h1>{countriesToFind[0].name.common}</h1>
            <p>Capital {countriesToFind[0].capital}</p>
            <p>Area {countriesToFind[0].area}</p>
            <h2>Languages</h2>
            
            <ul>
              {Object.values(countriesToFind[0].languages).map(lang => <li>{lang}</li> )}
            </ul>
            <img src={countriesToFind[0].flags.png} alt={countriesToFind[0].name.common} width={200}/>


          </div>
          : <ul>
            {countriesToFind.map(country=>
              <li key={country.name.common}>{country.name.common}
              <button onClick={() => setSearch(country.name.common)}>Show</button>
              </li>
            )}
            
          </ul>


      )}
    </div>
  )

  
}

export default App