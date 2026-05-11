import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: '1' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')

  const handleChangeName=(event)=> setNewName(event.target.value)
  const handleChangeNumber=(event)=> setNewNumber(event.target.value)
  

  const addNewPerson = (event)=>{
    event.preventDefault()

    const idDuplicate = persons.find(person => person.name.toLowerCase()===newName.toLowerCase())

    if (idDuplicate){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newObject={
      name: newName,
      number: newNumber,
      id: String(persons.length+1),
    }
    setPersons(persons.concat(newObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App