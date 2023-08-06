import './App.css';
import {useEffect, useState} from 'react'
import Persons from "./components/Persons";
import Form from './components/Form'
import Filter from "./components/Filter";
import {WarningFlash,SuccessFlash} from "./components/Flash";
import personsService from './services/persons'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [successMessage,setSuccessMessage] = useState('')
    const [warningMessage,setWarningMessage]=useState('')

    const filteredPersons = persons.filter(({name}) => {
        name = name.trim().toLowerCase()
        let filterStr = filterValue.trim().toLowerCase()
        let nameSubStr = name.substring(0, filterValue.length)
        if (filterValue === '' || nameSubStr === filterStr) return true
        return false
    })

    useEffect(()=>{
        if(successMessage!==''){
            let id = setTimeout(()=>{
                setSuccessMessage('')
            },3000)

            return ()=>{
                clearTimeout(id)
            }
        }
    },[successMessage])

    useEffect(()=>{
        if(warningMessage!==''){
            let id = setTimeout(()=>{
                setWarningMessage('')
            },3000)

            return ()=>{
                clearTimeout(id)
            }
        }
    },[warningMessage])



    useEffect(()=>{
        personsService.get()
            .then((data)=>setPersons([...data]))
    },[])



    const personState = {
        getByName(name) {
            return persons.find(person=>person.name.trim().toLowerCase()===name.trim().toLowerCase())
        },
        nameAlreadyExists(name){
            if(personState.getByName(name)) return true
            return false
        },
        getById(id){
            let res =  persons.find(person=>person.id===id)
            return res
        },
        updatePerson(id,newData){
            let withoutPerson = persons.filter(person=>person.id!==id)
            let updatedData = [...withoutPerson,newData]
            setPersons(updatedData)
        }
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilterValueChange = (e) => {
        setFilterValue(e.target.value)
    }

    function handleRemovePerson(id){
        let {name} = personState.getById(id)
        let shouldDelete = window.confirm(`Delete ${personState.getById(id).name} ?`)
        if(!shouldDelete) return
        personsService.remove(id)
            .then(()=>{
                let newPersons = persons.filter(person=>person.id!=id)
                setPersons(newPersons)
                setSuccessMessage(`Removed ${name}`)
            })
            .catch(err=>{
                setWarningMessage(`Information of ${name} has already been removed from the phone book`)
                let newPersons = persons.filter(person=>person.id!=id)
                setPersons(newPersons)
            })
    }


    handleFormSubmit.existingName=()=>{
        let existingPerson = personState.getByName(newName)
        let proceedWithUpdate = window.confirm(`${newName} already exists replace old number with new one?`)
        if(proceedWithUpdate){
            const newData = {name: newName, number: newNumber}
            personsService.update(existingPerson.id,newData)
                .then(data=>{
                    personState.updatePerson(data.id,data)
                    setSuccessMessage(`updated number for ${newName}`)
                    setNewName('')
                    setNewNumber('')
                })
        }
    }
   handleFormSubmit.newName=()=>{
        const newPerson = {name: newName, number: newNumber}
        personsService.create(newPerson)
            .then(data=>{
                setPersons([...persons, {...data}])
                setSuccessMessage(`Added ${newName}`)
                setNewName('')
                setNewNumber('')
            })
    }

    function handleFormSubmit(e){
        e.preventDefault()
        if (personState.nameAlreadyExists(newName)) return handleFormSubmit.existingName()
        handleFormSubmit.newName()
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <SuccessFlash message={successMessage}/>
            <WarningFlash message={warningMessage}/>
            <Filter onFilterValueChange={handleFilterValueChange}/>
            <Form onFormSubmit={handleFormSubmit}
                  onNameChange={handleNameChange}
                  onNumberChange={handleNumberChange}
                  name={newName}
                  number={newNumber}
            />
            <Persons persons={filteredPersons} removePerson={handleRemovePerson}/>

        </div>
    )
}

export default App
