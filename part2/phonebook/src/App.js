import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import entriesService from './services/entries'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

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
        setMessage(
          `${personObject.name} has been added to the contact list.`
        )
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
        .catch(error => {
          setMessageType('error')
          setMessage(
            `Contact '${personObject.name}' can't be added`
          )
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
    }

    else if (entry && window.confirm(`Update phone for ${entry.name}?`)) {
      entriesService
        .update(entry.id, changedEntry)
        .then(returnedPerson => {
          setPersons(
            persons.map(p => (p.id !== entry.id ? p : returnedPerson))
          )
          setMessage(
            `Contact for ${entry.name} has been updated.`
          )
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
        .catch(error => {
          setMessageType('error')
          setMessage(
            `Contact '${entry.name}' was already removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      entriesService
        .remove(id, name)
        .then(res => {
          const filteredPersons = persons.filter(p => p.id !== id)
          setPersons(filteredPersons)
          setMessage(
            `${name} has been removed from the contact list.`
          )
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
        .catch(error => {
          setMessageType('error')
          setMessage(
            `Contact '${name}' can't be removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 2000)
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
      <Notification message={message} type={messageType} />
      <PersonList persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
