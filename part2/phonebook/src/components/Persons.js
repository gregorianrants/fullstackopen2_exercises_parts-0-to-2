function Person({person,removePerson}){
    return (
        <li key={person.name}>
            {person.name} {person.number} <button onClick={removePerson}>delete</button>
        </li>
    )
}

function Persons({persons,removePerson}) {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person =>
                    <Person person={person} key={person.id} removePerson={()=>removePerson(person.id)}/>
                )}
            </ul>
        </div>
    )
}


export default Persons