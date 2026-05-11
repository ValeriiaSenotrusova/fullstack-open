import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: '1' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChangeName=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addNewName = (event)=>{
    event.preventDefault()
    const newObject={
      name: newName,
      id: String(persons.length+1),
    }
    setPersons(persons.concat(newObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleChangeName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.id}>{person.name}</p>
      )}
    </div>
  )
}

export default App