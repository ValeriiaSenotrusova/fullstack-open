import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phonesService from './services/phones'
import phones from './services/phones'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')
  const [newFilter, setFilter]= useState('')
  

  useEffect(() => {
    console.log('1.')
    phonesService
      .getAll()
      .then(initialPhones => setPersons(initialPhones))
  }, [])

    const personToFind = newFilter === ''
    ? persons
    : persons.filter(person=> person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addNewPerson = (event)=>{
    event.preventDefault()

    /*const idDuplicate = persons.find(person => person.name.toLowerCase()===newName.toLowerCase())

    if (idDuplicate){
      alert(`${newName} is already added to phonebook`)
      return
    }*/
    const newObject={
      name: newName,
      number: newNumber,
      id: String(persons.length+1),
    }

    phonesService
      .create(newObject)
      .then(returnedPhone=> {
        setPersons(persons.concat(returnedPhone))
        setNewName('')
        setNewNumber('')
      })

  }

 
  const handleChangeName=(event)=> setNewName(event.target.value)
  const handleChangeNumber=(event)=> setNewNumber(event.target.value)
  const handleChangeFilter=(event)=> setFilter(event.target.value)
  

  return (
    <div>
      <h2>Phonebook</h2>
       <Filter value={newFilter} onChange={handleChangeFilter}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addNewPerson} newName={newName} handleChangeName={handleChangeName} newNumber={newNumber} handleChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons personToFind={personToFind}/>
    </div>
  )
}

export default App