import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import entriesService from './services/entries'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = React.useState([])

  useEffect(() => {
    const results = persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)    
  }, [persons, searchTerm])

  useEffect(() => {
    entriesService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const entry = persons.find(p => p.name === newName)
    const changedEntry = { ...entry, number: personObject.number }

    if (!entry) {
      entriesService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
        .catch(error => {
          console.log('Error creating a new entry')
        })
    }

    else if (entry && window.confirm(`Update phone for ${entry.name}?`)) {
      entriesService
        .update(entry.id, changedEntry)
        .then(returnedPerson => {
          setPersons(
            persons.map(p => (p.id !== entry.id ? p : returnedPerson))
          )
        })
        .catch(error => {
          console.log('Error updating the entry')
        })
    }
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleNameChange = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      entriesService
        .remove(id, name)
        .then(res => {
          const filteredPersons = persons.filter(p => p.id !== id)
          setPersons(filteredPersons)
        })
        .catch(err => {
          console.log('Error deleting the entry')
        })
    }
  }

  const personsToShow = searchTerm ? searchResults : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange={handleSearchChange} />

      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onChangeName={handleNameChange}
        numberValue={newNumber}
        onChangeNumber={handleNumberChange}
      />

      <h2>Numbers</h2>
      <PersonList persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
