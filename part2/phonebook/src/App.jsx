import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import phonesService from './services/phones'
import phones from './services/phones'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')
  const [newFilter, setFilter]= useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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

    const idDuplicate = persons.find(person => person.name.toLowerCase()===newName.toLowerCase())

    if (idDuplicate){
      alert(`${newName} is already added to phonebook`)
      updatePhoneNumber(idDuplicate)
    } else {
    const newObject={
      name: newName,
      number: newNumber
    }

    phonesService
      .create(newObject)
      .then(returnedPhone=> {
        setPersons(persons.concat(returnedPhone))

        setErrorMessage(`Added ${returnedPhone.name}`)
        setTimeout(() => {
        setErrorMessage(null)
        }, 3000)

        setNewName('')
        setNewNumber('')
      })
    }
  }

   const deletePerson = (id,name) => {
    if (window.confirm(`Delete ${name}?`))

    phonesService
      .deleteFrom(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
      alert( `the person '${name}' was already deleted from server`)
    })
  }  

   const updatePhoneNumber = (idDuplicate) => {
    if (window.confirm(`${idDuplicate.name} is already added to phonebook, replace the old number with a new one?`)){
      const changedNumber = { ...idDuplicate, number: newNumber }

      phonesService
      .update(idDuplicate.id, changedNumber)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== idDuplicate.id ? p : returnedPerson ))

        setErrorMessage(`Updated number for ${returnedPerson.name}`)
    
        setTimeout(() => { setErrorMessage(null)
        }, 3000)  

        setNewName('')
        setNewNumber('')
      })
     }
    }  

 
  const handleChangeName=(event)=> setNewName(event.target.value)
  const handleChangeNumber=(event)=> setNewNumber(event.target.value)
  const handleChangeFilter=(event)=> setFilter(event.target.value)
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
       <Filter value={newFilter} onChange={handleChangeFilter}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addNewPerson} newName={newName} handleChangeName={handleChangeName} newNumber={newNumber} handleChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons personToFind={personToFind} deletePerson={deletePerson}/>
    </div>
  )
}

export default App