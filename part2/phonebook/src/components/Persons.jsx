
const Persons = ({ personToFind }) => {
   console.log('2.')
  return (
     <div>
      {personToFind.map(persons =>
        <p key={persons.id}>
          {persons.name} {persons.number}
        </p>
      )}
     </div>)
}

export default Persons