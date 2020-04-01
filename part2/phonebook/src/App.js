import React, { useState, useEffect } from "react";
import axios from 'axios'
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  /*  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])  */
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  useEffect(() => {
    const results = persons.filter(
      person => person.name.toLowerCase().includes(searchTerm.toLowerCase())
      //person.name.toLowerCase() === searchTerm.toLowerCase()
    );
    setSearchResults(results);
  }, [persons, searchTerm]);


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const filteredPersons = myName =>
    //persons.filter(it => it.name.includes(myName));
    persons.filter(it => it.name.toLowerCase() === newName.toLowerCase());

  const addPerson = event => {
    event.preventDefault();
    if (filteredPersons(newName).length === 0) {
      const personObject = {
        name: newName,
        number: newNumber
      };

      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const personsToShow = searchTerm ? searchResults : persons;

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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
