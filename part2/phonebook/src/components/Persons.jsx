
const Persons = ({ personToFind, deletePerson}) => {
  return (
     <div>
      {personToFind.map(persons =>(
        <p key={persons.id}>
          {persons.name} {persons.number} 
          <button onClick={() => deletePerson(persons.id, persons.name)}>
            delete
          </button>
        </p>
     ) )}
      
     </div>
     )
}

export default Persons