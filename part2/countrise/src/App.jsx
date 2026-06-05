import { useState, useEffect } from 'react'
import countriseService from './services/countrise'
import Filter from './components/Filter'


const App = () => {
  const[countrise, setCountries] = useState([])
  const[search, setSearch] = useState('')
  const[weather, setWeather]= useState(null)
  
  

  useEffect(() => {
    countriseService
      .getAll()
      .then(data=>setCountries(data))

  },[])

  useEffect(() =>{
    if (countriesToFind.length === 1){
      countriseService
        .getWeather(countriesToFind[0].capital[0])
        .then(data => setWeather(data))
    }
    
  },[search])
  console.log(weather)

  const countriesToFind = search === ''
  ? countrise
  : countrise.filter(country=>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  console.log(weather)

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
              {Object.values(countriesToFind[0].languages).map(lang => <li key={lang}>{lang}</li> )}
            </ul>
            <img src={countriesToFind[0].flags.png} alt={countriesToFind[0].name.common} width={200}/>

            <h2>Weather in {countriesToFind[0].capital[0]}</h2>
            <p>Temperature {weather && weather.main.temp}</p>
            <img src={`https://openweathermap.org/img/wn/${weather && weather.weather[0].icon}@2x.png`}  />

            <p>Wind {weather && weather.wind.speed} m/s</p>
          

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