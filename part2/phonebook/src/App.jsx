import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')
  const [newFilter, setFilter]= useState('')

  const handleChangeName=(event)=> setNewName(event.target.value)
  const handleChangeNumber=(event)=> setNewNumber(event.target.value)
  const handleChangeFilter=(event)=> setFilter(event.target.value)
  
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
    setNewNumber('')
  }

  const personToFind = newFilter ===''
    ? persons
    : persons.filter(person=> person.name.toLowerCase().includes(newFilter.toLowerCase())
)

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={newFilter} onChange={handleChangeFilter}></input>
        </div>
      <h2>add a new</h2>
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
      {personToFind.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App